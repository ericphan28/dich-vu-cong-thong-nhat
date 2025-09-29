const https = require('https');

function checkHeaderSource(hostname) {
  const options = {
    hostname: hostname,
    port: 443,
    path: '/',
    method: 'GET', // Full request to see all headers
    headers: {
      'User-Agent': 'CORS-Security-Test/1.0',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache'
    }
  };

  console.log(`🔍 Full Header Analysis: https://${hostname}`);
  console.log('═══════════════════════════════════════════════════════════════\n');
  
  const req = https.request(options, (res) => {
    console.log('📊 Response Status:', res.statusCode);
    console.log('📅 Date:', res.headers.date);
    console.log('🌐 Server:', res.headers.server || 'NOT SET');
    console.log('🏷️  Via:', res.headers.via || 'NOT SET');
    console.log('🔄 X-Cache:', res.headers['x-cache'] || 'NOT SET');
    console.log('🆔 X-Request-ID:', res.headers['x-request-id'] || 'NOT SET');
    
    console.log('\n🚨 CORS Analysis:');
    console.log('────────────────────────────────────────────────────────────');
    
    const corsOrigin = res.headers['access-control-allow-origin'];
    if (corsOrigin === '*') {
      console.log('❌ access-control-allow-origin: * (CRITICAL SECURITY ISSUE)');
      console.log('📍 Source Analysis:');
      
      if (res.headers.server && res.headers.server.includes('Vercel')) {
        console.log('   🎯 Likely Source: Vercel Platform Level');
      }
      if (res.headers.via) {
        console.log('   🎯 Likely Source: CDN/Proxy Layer');
      }
      if (res.headers['x-nextjs-prerender']) {
        console.log('   🎯 Likely Source: Next.js Framework Default');
      }
      
    } else if (corsOrigin) {
      console.log(`✅ access-control-allow-origin: ${corsOrigin} (SECURE)`);
    } else {
      console.log('✅ No CORS headers (SECURE)');
    }
    
    console.log('\n📋 All Response Headers:');
    console.log('────────────────────────────────────────────────────────────');
    Object.keys(res.headers).forEach(header => {
      const value = res.headers[header];
      if (header.toLowerCase().includes('access-control')) {
        console.log(`🚨 ${header}: ${value}`);
      } else if (header.toLowerCase().includes('cache')) {
        console.log(`🔄 ${header}: ${value}`);
      } else if (header.toLowerCase().includes('server') || header.toLowerCase().includes('via')) {
        console.log(`🏗️  ${header}: ${value}`);
      } else {
        console.log(`   ${header}: ${value}`);
      }
    });
  });

  req.on('error', (e) => {
    console.error('❌ Error:', e.message);
  });

  req.end();
}

async function main() {
  console.log('🕵️ CORS Header Source Investigation');
  console.log('═══════════════════════════════════════════════════════════════\n');
  
  // Test custom domain to find source of wildcard CORS
  checkHeaderSource('thongnhat.giakiemso.com');
  
  setTimeout(() => {
    console.log('\n\n💡 CORS Security Recommendations:');
    console.log('═══════════════════════════════════════════════════════════════');
    console.log('1. If source is Next.js Framework: Add explicit CORS override');
    console.log('2. If source is Vercel Platform: Use Vercel config overrides');
    console.log('3. If source is CDN/DNS: Configure at DNS provider level');
    console.log('4. If source is unknown: Implement at application middleware level');
    console.log('\n🎯 Current status: CORS security fix in progress...');
  }, 3000);
}

main();