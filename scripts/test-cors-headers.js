const https = require('https');

const options = {
  hostname: 'thongnhat.giakiemso.com',
  port: 443,
  path: '/',
  method: 'HEAD'
};

console.log('🔍 Checking CORS headers for: https://thongnhat.giakiemso.com\n');

const req = https.request(options, (res) => {
  console.log('📊 Response Status:', res.statusCode);
  console.log('\n🌐 CORS-related Headers:');
  console.log('────────────────────────────────────────────────────────────');
  
  let corsFound = false;
  
  Object.keys(res.headers).forEach(header => {
    if (header.toLowerCase().includes('access-control')) {
      corsFound = true;
      console.log(`✅ ${header}: ${res.headers[header]}`);
    }
  });
  
  if (!corsFound) {
    console.log('ℹ️  No CORS headers found (which is good for security)');
  }
  
  console.log('\n🔒 All Response Headers:');
  console.log('────────────────────────────────────────────────────────────');
  Object.keys(res.headers).forEach(header => {
    console.log(`${header}: ${res.headers[header]}`);
  });
});

req.on('error', (e) => {
  console.error('❌ Error:', e.message);
});

req.end();