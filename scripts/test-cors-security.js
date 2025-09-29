const https = require('https');

async function testCORSFromOrigin(origin, testName) {
  return new Promise((resolve) => {
    const options = {
      hostname: 'thongnhat.giakiemso.com',
      port: 443,
      path: '/',
      method: 'HEAD',
      headers: {
        'Origin': origin
      }
    };

    console.log(`\n🧪 ${testName}`);
    console.log(`📤 Testing Origin: ${origin}`);
    
    const req = https.request(options, (res) => {
      const corsOrigin = res.headers['access-control-allow-origin'];
      const corsCredentials = res.headers['access-control-allow-credentials'];
      const corsMethods = res.headers['access-control-allow-methods'];
      
      console.log(`📥 CORS Origin Response: ${corsOrigin || 'NOT SET'}`);
      console.log(`🔐 Credentials: ${corsCredentials || 'NOT SET'}`);
      console.log(`⚙️  Methods: ${corsMethods || 'NOT SET'}`);
      
      if (corsOrigin === '*') {
        console.log('❌ SECURITY RISK: Wildcard origin detected!');
        resolve({ origin, allowed: true, wildcard: true, secure: false });
      } else if (corsOrigin === origin) {
        console.log('✅ SECURE: Origin specifically allowed');
        resolve({ origin, allowed: true, wildcard: false, secure: true });
      } else {
        console.log('🔒 SECURE: Origin not in allowed list');
        resolve({ origin, allowed: false, wildcard: false, secure: true });
      }
    });

    req.on('error', (e) => {
      console.error('❌ Error:', e.message);
      resolve({ origin, error: e.message, secure: false });
    });

    req.end();
  });
}

async function runCORSSecurityTest() {
  console.log('🛡️ CORS Security Test for: https://thongnhat.giakiemso.com');
  console.log('═══════════════════════════════════════════════════════════════');
  
  const testCases = [
    {
      origin: 'https://thongnhat.giakiemso.com',
      name: 'Trusted Origin (Main Domain)'
    },
    {
      origin: 'https://giakiemso.com', 
      name: 'Trusted Origin (Parent Domain)'
    },
    {
      origin: 'https://evil-website.com',
      name: 'Untrusted Origin (Should be blocked)'
    },
    {
      origin: 'https://malicious-site.net',
      name: 'Malicious Origin (Should be blocked)'
    },
    {
      origin: 'null',
      name: 'Null Origin (File/Local access)'
    }
  ];
  
  const results = [];
  
  for (const testCase of testCases) {
    const result = await testCORSFromOrigin(testCase.origin, testCase.name);
    results.push(result);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Rate limiting
  }
  
  console.log('\n📊 CORS Security Summary');
  console.log('═══════════════════════════════════════════════════════════════');
  
  let securityScore = 0;
  let totalTests = results.length;
  let wildcardDetected = false;
  
  results.forEach(result => {
    if (result.error) {
      console.log(`❌ ${result.origin}: ERROR - ${result.error}`);
    } else if (result.wildcard) {
      console.log(`❌ ${result.origin}: WILDCARD DETECTED - MAJOR SECURITY RISK`);
      wildcardDetected = true;
    } else if (result.secure) {
      console.log(`✅ ${result.origin}: SECURE`);
      securityScore++;
    } else {
      console.log(`⚠️ ${result.origin}: NEEDS REVIEW`);
    }
  });
  
  const scorePercentage = Math.round((securityScore / totalTests) * 100);
  
  console.log(`\n🎯 CORS Security Score: ${securityScore}/${totalTests} (${scorePercentage}%)`);
  
  if (wildcardDetected) {
    console.log('🚨 CRITICAL: Wildcard CORS detected - IMMEDIATE ACTION REQUIRED');
    console.log('💡 Recommendation: Remove access-control-allow-origin: * immediately');
  } else if (scorePercentage >= 80) {
    console.log('✅ EXCELLENT: CORS policy is secure');
  } else if (scorePercentage >= 60) {
    console.log('⚠️ GOOD: CORS policy needs minor improvements');
  } else {
    console.log('❌ POOR: CORS policy needs major security improvements');
  }
  
  console.log('\n📚 CORS Security Best Practices:');
  console.log('1. Never use access-control-allow-origin: *');
  console.log('2. Specify exact allowed origins');
  console.log('3. Use credentials: true only when necessary');
  console.log('4. Limit allowed methods to what you need');
  console.log('5. Regularly audit CORS configuration');
}

runCORSSecurityTest().catch(console.error);