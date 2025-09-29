const http = require('http');

function testLocalCORS() {
  const options = {
    hostname: 'localhost',
    port: 3005,
    path: '/',
    method: 'HEAD'
  };

  console.log('🔍 Testing local CORS headers: http://localhost:3005\n');
  
  const req = http.request(options, (res) => {
    console.log('📊 Status:', res.statusCode);
    console.log('\n🌐 CORS Headers:');
    console.log('────────────────────────────────────────────────────────────');
    
    const corsOrigin = res.headers['access-control-allow-origin'];
    const corsCredentials = res.headers['access-control-allow-credentials'];
    const corsMethods = res.headers['access-control-allow-methods'];
    const corsHeaders = res.headers['access-control-allow-headers'];
    
    if (corsOrigin) {
      if (corsOrigin === '*') {
        console.log('❌ access-control-allow-origin: * (SECURITY RISK!)');
      } else {
        console.log(`✅ access-control-allow-origin: ${corsOrigin} (SECURE)`);
      }
    } else {
      console.log('ℹ️  access-control-allow-origin: NOT SET');
    }
    
    if (corsCredentials) {
      console.log(`🔐 access-control-allow-credentials: ${corsCredentials}`);
    }
    
    if (corsMethods) {
      console.log(`⚙️  access-control-allow-methods: ${corsMethods}`);
    }
    
    if (corsHeaders) {
      console.log(`📋 access-control-allow-headers: ${corsHeaders}`);
    }
    
    console.log('\n📋 All Headers:');
    console.log('────────────────────────────────────────────────────────────');
    Object.keys(res.headers).forEach(header => {
      console.log(`${header}: ${res.headers[header]}`);
    });
  });

  req.on('error', (e) => {
    console.error('❌ Error:', e.message);
  });

  req.end();
}

testLocalCORS();