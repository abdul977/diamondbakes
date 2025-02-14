const https = require('https');

const categories = [
  { name: 'CAKES', query: 'cake+celebration' },
  { name: 'BREAD', query: 'artisan+bread' },
  { name: 'PIES', query: 'meat+pie' },
  { name: 'SMALL CHOPS', query: 'finger+food+appetizers' },
  { name: 'SHAWARMA', query: 'shawarma+wrap' },
  { name: 'PASTRIES', query: 'pastries+bakery' }
];

const API_KEY = 'a36P8_gh54qoYAebDmKpwJfp3pNiZBxOxDTbGLObfdg';

async function fetchImages(category) {
  return new Promise((resolve, reject) => {
    const url = `https://api.unsplash.com/search/photos?query=${category.query}&per_page=20&client_id=${API_KEY}`;
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        const images = JSON.parse(data).results.map(img => img.urls.regular);
        console.log(`\n=== ${category.name} ===`);
        images.forEach((url, i) => console.log(`${i + 1}. ${url}`));
        resolve();
      });
    }).on('error', reject);
  });
}

async function main() {
  for (const category of categories) {
    await fetchImages(category);
  }
}

main().catch(console.error);
