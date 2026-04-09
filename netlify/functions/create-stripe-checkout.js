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

    // 価格IDの取得 (環境変数から)
    let priceId = "";
    if (plan.toLowerCase() === 'personal') {
      priceId = process.env.STRIPE_PERSONAL_PRICE_ID;
    } else if (plan.toLowerCase() === 'defense') {
      priceId = process.env.STRIPE_DEFENSE_PRICE_ID;
    }

    // Stripe Checkout Sessionの構成
    const sessionConfig = {
      payment_method_types: ['card'],
      success_url: `${process.env.URL || 'https://noveos.jp'}/success.html?plan=${plan}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.URL || 'https://noveos.jp'}/pricing.html?canceled=true`,
      metadata: {
        plan: plan,
        planName: planName,
      },
    };

    if (priceId) {
      // 登録済みの定期支払いプラン（サブスクリプション）を使用
      sessionConfig.line_items = [{ price: priceId, quantity: 1 }];
      sessionConfig.mode = 'subscription';
    } else {
      // フォールバック: 単発決済として作成
      sessionConfig.line_items = [
        {
          price_data: {
            currency: 'jpy',
            product_data: {
              name: `NOVE OS V34 - ${planName}`,
              description: `月額プラン - ${planName}`,
            },
            unit_amount: parseInt(amount),
          },
          quantity: 1,
        },
      ];
      sessionConfig.mode = 'payment';
    }

    // Stripe Checkout Session作成
    const session = await stripe.checkout.sessions.create(sessionConfig);

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
