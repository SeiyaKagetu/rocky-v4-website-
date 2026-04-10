const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  // 404を回避するため、どんなリクエストも受け付ける
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const response = await fetch('https://formspree.io/f/mbdpvwey', {
      method: 'POST',
      body: event.body,
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json' 
      }
    });

    const data = await response.json();
    return {
      statusCode: response.ok ? 200 : 400,
      body: JSON.stringify(data),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      }
    };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
};
