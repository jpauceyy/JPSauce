import https from 'https';

https.get('https://www.reactbits.dev/components/pixel-transition', (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    // find pixel transition words
    console.log(data.slice(0, 1000));
  });
});
