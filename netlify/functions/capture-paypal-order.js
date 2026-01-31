/**
 * Netlify Function: PayPal支払い確認
 * 
 * ユーザーがPayPalで支払いを承認した後に呼び出され、支払いを確定します。
 */

const paypal = require('@paypal/checkout-server-sdk');

/**
 * PayPal環境設定（Sandbox）
 */
function environment() {
  const clientId = process.env.PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

  // Sandbox環境（テスト）
  return new paypal.core.SandboxEnvironment(clientId, clientSecret);

  // 本番環境に切り替える場合は以下を使用
  // return new paypal.core.LiveEnvironment(clientId, clientSecret);
}

/**
 * PayPalクライアント作成
 */
function client() {
  return new paypal.core.PayPalHttpClient(environment());
}

/**
 * Netlify Function Handler
 */
exports.handler = async (event, context) => {
  // CORSヘッダー設定
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };

  // OPTIONSリクエスト（プリフライト）への対応
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  // POSTメソッドのみ許可
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  try {
    // リクエストボディから注文IDを取得
    const { orderID } = JSON.parse(event.body);

    if (!orderID) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Order ID is required' }),
      };
    }

    // 支払い確認リクエスト
    const request = new paypal.orders.OrdersCaptureRequest(orderID);
    request.requestBody({});

    // PayPal APIに支払い確認リクエスト送信
    const capture = await client().execute(request);

    // 成功レスポンス
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        id: capture.result.id,
        status: capture.result.status,
        payer: {
          email: capture.result.payer.email_address,
          name: capture.result.payer.name.given_name + ' ' + capture.result.payer.name.surname,
        },
        amount: {
          currency: capture.result.purchase_units[0].amount.currency_code,
          value: capture.result.purchase_units[0].amount.value,
        },
      }),
    };
  } catch (error) {
    console.error('PayPal Order Capture Error:', error);

    // エラーレスポンス
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Failed to capture PayPal order',
        details: error.message,
      }),
    };
  }
};
