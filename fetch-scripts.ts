import https from 'https';

const url = 'https://www.produx.design/_next/static/chunks/app/layout-0a8a81fa3d6b0485.js';

https.get('https://www.produx.design', (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    const scripts = data.match(/<script[^>]*src="([^"]+)"[^>]*>/g);
    console.log(scripts);
  });
});
