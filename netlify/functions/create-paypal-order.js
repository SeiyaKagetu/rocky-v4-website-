/**
 * Netlify Function: PayPal注文作成
 * 
 * フロントエンドから呼び出され、PayPal APIを使用して注文を作成します。
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
    // リクエストボディから料金プラン情報を取得
    const { plan, amount } = JSON.parse(event.body);

    // 注文作成リクエスト
    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer("return=representation");
    request.requestBody({
      intent: 'CAPTURE',
      purchase_units: [{
        description: `Rocky Linux v4.0 - ${plan}`,
        amount: {
          currency_code: 'JPY',
          value: amount.toString(),
        },
      }],
      application_context: {
        brand_name: 'NOVE Systems',
        landing_page: 'BILLING',
        user_action: 'PAY_NOW',
        return_url: `${process.env.URL}/pricing.html?success=true`,
        cancel_url: `${process.env.URL}/pricing.html?canceled=true`,
      },
    });

    // PayPal APIに注文作成リクエスト送信
    const order = await client().execute(request);

    // 成功レスポンス
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        id: order.result.id,
      }),
    };
  } catch (error) {
    console.error('PayPal Order Creation Error:', error);

    // エラーレスポンス
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Failed to create PayPal order',
        details: error.message,
      }),
    };
  }
};
