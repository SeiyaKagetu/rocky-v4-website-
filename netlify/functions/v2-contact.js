const https = require('https');

exports.handler = async (event, context) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'formspree.io',
      path: '/f/mbdpvwey',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          },
          body: data
        });
      });
    });

    req.on('error', (e) => {
      resolve({
        statusCode: 500,
        body: JSON.stringify({ error: e.message })
      });
    });

    req.write(event.body);
    req.end();
  });
};
