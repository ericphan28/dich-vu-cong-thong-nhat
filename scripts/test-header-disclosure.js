#!/usr/bin/env node

/**
 * Security Headers Fingerprinting Test
 * Tests for information disclosure in HTTP headers
 */

const https = require('https');
const http = require('http');

const SENSITIVE_HEADERS = [
  'server',
  'x-powered-by', 
  'x-vercel-id',
  'x-nextjs-prerender',
  'x-nextjs-stale-time',
  'x-matched-path',
  'x-vercel-cache',
  'x-vercel-execution-region'
];

const SECURITY_HEADERS = [
  'content-security-policy',
  'x-frame-options',
  'x-content-type-options', 
  'referrer-policy',
  'strict-transport-security'
];

async function testHeaders(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https:') ? https : http;
    
    const req = client.request(url, { method: 'HEAD' }, (res) => {
      const headers = {};
      
      // Normalize header names to lowercase
      for (const [key, value] of Object.entries(res.headers)) {
        headers[key.toLowerCase()] = value;
      }
      
      resolve({
        statusCode: res.statusCode,
        headers: headers
      });
    });

    req.on('error', reject);
    req.setTimeout(10000, () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });
    
    req.end();
  });
}

function analyzeHeaders(headers) {
  const analysis = {
    sensitive: [],
    security: [],
    fingerprinting: [],
    score: 0
  };

  // Check for sensitive headers (should be hidden)
  for (const header of SENSITIVE_HEADERS) {
    if (headers[header]) {
      analysis.sensitive.push({
        header,
        value: headers[header],
        risk: 'HIGH',
        recommendation: 'Hide this header'
      });
    }
  }

  // Check for security headers (should be present)
  for (const header of SECURITY_HEADERS) {
    if (headers[header]) {
      analysis.security.push({
        header,
        value: headers[header],
        status: 'PRESENT'
      });
      analysis.score += 10;
    } else {
      analysis.security.push({
        header,
        value: null,
        status: 'MISSING'
      });
    }
  }

  // Check for fingerprinting vectors
  const fingerprintingVectors = [
    'etag',
    'x-vercel-id',
    'server',
    'x-powered-by'
  ];

  for (const header of fingerprintingVectors) {
    if (headers[header]) {
      analysis.fingerprinting.push({
        header,
        value: headers[header],
        risk: headers[header].includes('Vercel') || headers[header].includes('Next') ? 'HIGH' : 'MEDIUM'
      });
    }
  }

  // Calculate privacy score (100 - points lost for disclosure)
  const privacyScore = Math.max(0, 100 - (analysis.sensitive.length * 15) - (analysis.fingerprinting.length * 5));
  
  return { ...analysis, privacyScore };
}

function printAnalysis(url, data) {
  console.log(`\n🔍 Security Analysis for: ${url}`);
  console.log(`📊 Privacy Score: ${data.privacyScore}/100`);
  console.log(`🛡️ Security Score: ${data.score}/50\n`);

  // Sensitive Headers Analysis
  if (data.sensitive.length > 0) {
    console.log('🔴 SENSITIVE HEADERS (Should be hidden):');
    console.log('─'.repeat(60));
    data.sensitive.forEach(item => {
      console.log(`❌ ${item.header}: ${item.value}`);
      console.log(`   Risk: ${item.risk} - ${item.recommendation}\n`);
    });
  } else {
    console.log('✅ No sensitive headers detected\n');
  }

  // Fingerprinting Analysis  
  if (data.fingerprinting.length > 0) {
    console.log('🟡 FINGERPRINTING VECTORS:');
    console.log('─'.repeat(60));
    data.fingerprinting.forEach(item => {
      const emoji = item.risk === 'HIGH' ? '🔴' : '🟡';
      console.log(`${emoji} ${item.header}: ${item.value} (${item.risk} risk)\n`);
    });
  }

  // Security Headers Status
  console.log('🛡️ SECURITY HEADERS STATUS:');
  console.log('─'.repeat(60));
  data.security.forEach(item => {
    const emoji = item.status === 'PRESENT' ? '✅' : '❌';
    console.log(`${emoji} ${item.header}: ${item.status}`);
    if (item.value) {
      const truncated = item.value.length > 50 ? 
        item.value.substring(0, 50) + '...' : 
        item.value;
      console.log(`   📝 ${truncated}`);
    }
    console.log();
  });

  // Recommendations
  const issues = data.sensitive.length + data.fingerprinting.filter(f => f.risk === 'HIGH').length;
  if (issues > 0) {
    console.log('\n🔧 RECOMMENDATIONS:');
    console.log('─'.repeat(40));
    console.log('• Hide sensitive infrastructure headers');
    console.log('• Use custom server headers');
    console.log('• Implement header stripping in middleware');
    console.log('• Consider using a reverse proxy for additional filtering');
  }

  // Overall Assessment
  console.log('\n🎯 OVERALL ASSESSMENT:');
  console.log('─'.repeat(30));
  if (data.privacyScore >= 90 && data.score >= 40) {
    console.log('🟢 EXCELLENT - Strong security with minimal disclosure');
  } else if (data.privacyScore >= 70 && data.score >= 30) {
    console.log('🟡 GOOD - Minor improvements needed');
  } else {
    console.log('🔴 NEEDS IMPROVEMENT - Security and privacy concerns');
  }
}

async function main() {
  const urls = process.argv.slice(2).length > 0 ? 
    process.argv.slice(2) : 
    ['https://thongnhat.giakiemso.com'];

  for (const url of urls) {
    try {
      console.log(`\n🔍 Testing ${url}...`);
      const response = await testHeaders(url);
      const analysis = analyzeHeaders(response.headers);
      
      printAnalysis(url, analysis);
      
    } catch (error) {
      console.error(`❌ Error testing ${url}:`, error.message);
    }
  }

  console.log('\n✨ Analysis completed!');
  console.log('\n📚 Learn more:');
  console.log('🔗 https://securityheaders.com/ - Security headers scanner');
  console.log('🔗 https://observatory.mozilla.org/ - Mozilla Observatory');
}

if (require.main === module) {
  main();
}

module.exports = { testHeaders, analyzeHeaders };