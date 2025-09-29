const https = require('https');

async function testCORSHeaders(hostname) {
  return new Promise((resolve) => {
    const options = {
      hostname: hostname,
      port: 443,
      path: '/',
      method: 'HEAD'
    };

    console.log(`🔍 Testing: https://${hostname}\n`);
    
    const req = https.request(options, (res) => {
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
      
      console.log('\n🛡️ Security Assessment:');
      console.log('────────────────────────────────────────────────────────────');
      
      if (corsOrigin === '*') {
        console.log('🚨 CRITICAL: Wildcard CORS allows any origin!');
        console.log('💡 Recommendation: Replace with specific allowed origins');
        resolve({ secure: false, wildcard: true });
      } else if (corsOrigin && corsOrigin !== '*') {
        console.log('✅ SECURE: CORS restricted to specific origin');
        resolve({ secure: true, wildcard: false });
      } else {
        console.log('✅ SECURE: No CORS headers (most restrictive)');
        resolve({ secure: true, wildcard: false });
      }
    });

    req.on('error', (e) => {
      console.error('❌ Error:', e.message);
      resolve({ error: e.message });
    });

    req.end();
  });
}

async function main() {
  console.log('🛡️ CORS Security Test - After Fix');
  console.log('═══════════════════════════════════════════════════════════════\n');
  
  // Test both URLs
  const hostnames = [
    'thongnhat.giakiemso.com',
    'dich-vu-cong-thong-nhat-34mc8spbr-ericphan28s-projects.vercel.app'
  ];
  
  for (const hostname of hostnames) {
    const result = await testCORSHeaders(hostname);
    console.log('═══════════════════════════════════════════════════════════════\n');
    
    if (result.error) {
      console.log(`❌ Failed to test ${hostname}: ${result.error}\n`);
    }
    
    // Wait between requests
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  
  console.log('✨ CORS Security Test Complete!');
  console.log('\n📚 Next Steps:');
  console.log('1. Verify custom domain also has the fix');
  console.log('2. Run full security test: npm run security:cors');
  console.log('3. Monitor for any remaining CORS issues');
}

main().catch(console.error);