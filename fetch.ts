import https from 'https';

https.get('https://www.produx.design', (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    // Look for clues about pixelate
    const canvasClues = data.match(/<canvas[^>]*>/g);
    const scriptClues = data.match(/<script[^>]*>.*?<\/script>/g);
    const linkClues = data.match(/<link[^>]*>/g);
    
    console.log("Canvas tags:", canvasClues);
    console.log("Link tags:", linkClues);
    
    // Find anything with pixelate
    const matches = data.match(/.{0,50}pixel.{0,50}/gi);
    console.log("Pixel matches:", matches);
  });
}).on('error', (err) => console.log('Error: ', err.message));
