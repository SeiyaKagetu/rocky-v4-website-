/**
 * Netlify Function: Stripe Checkout作成
 *
 * フロントエンドから呼び出され、Stripe Checkout Sessionを作成します。
 */

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

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
    const { plan, amount, planName } = JSON.parse(event.body);

    // 料金プラン情報の検証
    if (!plan || !amount || !planName) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          error: 'Missing required parameters: plan, amount, planName'
        }),
      };
    }

    // Stripe Checkout Session作成
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'jpy',
            product_data: {
              name: `Rocky Linux v4.0 - ${planName}`,
              description: `月額プラン - ${planName}`,
            },
            unit_amount: parseInt(amount),
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.URL}/pricing.html?success=true&plan=${plan}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.URL}/pricing.html?canceled=true`,
      metadata: {
        plan: plan,
        planName: planName,
      },
    });

    // 成功レスポンス
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        sessionId: session.id,
        url: session.url,
      }),
    };
  } catch (error) {
    console.error('Stripe Checkout Session Creation Error:', error);

    // エラーレスポンス
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Failed to create Stripe checkout session',
        details: error.message,
      }),
    };
  }
};
