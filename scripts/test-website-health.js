const https = require('https');

function testWebsiteHealth(hostname) {
  return new Promise((resolve) => {
    const options = {
      hostname: hostname,
      port: 443,
      path: '/',
      method: 'GET',
      headers: {
        'User-Agent': 'Website-Health-Check/1.0'
      }
    };

    console.log(`🔍 Testing website health: https://${hostname}`);
    console.log('═══════════════════════════════════════════════════════════════\n');
    
    const req = https.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        console.log('📊 Response Status:', res.statusCode);
        console.log('📅 Date:', res.headers.date);
        console.log('📦 Content-Length:', res.headers['content-length'] || 'N/A');
        console.log('🌐 Content-Type:', res.headers['content-type'] || 'N/A');
        
        // Check if page content looks normal
        const hasTitle = data.includes('<title>');
        const hasBody = data.includes('<body>') || data.includes('body');
        const hasContent = data.length > 1000; // Reasonable content size
        const hasError = data.includes('500 Internal Server Error') || data.includes('404 Not Found') || data.includes('Application Error');
        
        console.log('\n🔍 Content Analysis:');
        console.log('────────────────────────────────────────────────────────────');
        console.log(`📝 Has Title Tag: ${hasTitle ? '✅' : '❌'}`);
        console.log(`🏗️  Has Body Content: ${hasBody ? '✅' : '❌'}`);
        console.log(`📏 Content Size: ${data.length} bytes ${hasContent ? '✅' : '❌'}`);
        console.log(`🚨 Error Indicators: ${hasError ? '❌' : '✅'}`);
        
        console.log('\n🎯 Website Health Assessment:');
        console.log('────────────────────────────────────────────────────────────');
        
        if (res.statusCode === 200 && hasTitle && hasBody && hasContent && !hasError) {
          console.log('✅ HEALTHY: Website is working normally');
          console.log('🟢 Status: All checks passed');
          resolve({ healthy: true, status: res.statusCode });
        } else if (res.statusCode === 200 && !hasContent) {
          console.log('⚠️ WHITE PAGE: Website returning empty/minimal content');
          console.log('🔧 Issue: Likely rendering problem or missing content');
          resolve({ healthy: false, issue: 'white_page', status: res.statusCode });
        } else if (res.statusCode !== 200) {
          console.log(`❌ ERROR: HTTP ${res.statusCode} status code`);
          console.log('🔧 Issue: Server error or page not found');
          resolve({ healthy: false, issue: 'http_error', status: res.statusCode });
        } else {
          console.log('⚠️ PARTIAL: Some issues detected');
          console.log('🔧 Issue: Content quality problems');
          resolve({ healthy: false, issue: 'content_issues', status: res.statusCode });
        }
        
        // Show preview of content
        if (data.length > 0) {
          console.log('\n📖 Content Preview (first 200 chars):');
          console.log('────────────────────────────────────────────────────────────');
          console.log(data.substring(0, 200) + '...');
        }
      });
    });

    req.on('error', (e) => {
      console.error('❌ Connection Error:', e.message);
      resolve({ healthy: false, error: e.message });
    });

    req.setTimeout(10000, () => {
      console.error('⏰ Timeout: Request took too long');
      req.destroy();
      resolve({ healthy: false, error: 'timeout' });
    });

    req.end();
  });
}

async function main() {
  console.log('🏥 Website Health Check');
  console.log('═══════════════════════════════════════════════════════════════\n');
  
  const result = await testWebsiteHealth('thongnhat.giakiemso.com');
  
  console.log('\n📋 Summary:');
  console.log('═══════════════════════════════════════════════════════════════');
  
  if (result.healthy) {
    console.log('🎉 Website is HEALTHY and working properly!');
    console.log('✅ No issues detected');
  } else {
    console.log('🚨 Website has issues that need attention');
    console.log(`🔧 Issue Type: ${result.issue || result.error}`);
    console.log('💡 Recommendation: Check recent deployments and logs');
  }
  
  console.log('\n🔗 Next Steps:');
  console.log('1. If healthy: No action needed');
  console.log('2. If white page: Check build output and deployment');
  console.log('3. If errors: Check server logs and configuration');
}

main().catch(console.error);