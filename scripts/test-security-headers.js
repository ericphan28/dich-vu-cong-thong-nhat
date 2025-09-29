#!/usr/bin/env node

/**
 * Security Headers Test Script
 * Tests security headers on local and production environments
 */

const https = require('https');
const http = require('http');

const REQUIRED_HEADERS = [
  'content-security-policy',
  'x-frame-options', 
  'x-content-type-options',
  'referrer-policy',
  'permissions-policy',
  'strict-transport-security'
];

const OPTIONAL_HEADERS = [
  'cross-origin-embedder-policy',
  'cross-origin-opener-policy',
  'cross-origin-resource-policy'
];

function testHeaders(url) {
  return new Promise((resolve, reject) => {
    const isHttps = url.startsWith('https://');
    const client = isHttps ? https : http;
    
    const options = {
      method: 'HEAD',
      headers: {
        'User-Agent': 'Security-Headers-Test/1.0'
      }
    };

    const req = client.request(url, options, (res) => {
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

function calculateScore(headers) {
  let score = 0;
  let maxScore = 0;
  const results = [];

  // Check required headers
  for (const header of REQUIRED_HEADERS) {
    maxScore += 15;
    if (headers[header]) {
      score += 15;
      results.push({ header, status: 'PASS', required: true, value: headers[header] });
    } else {
      results.push({ header, status: 'FAIL', required: true, value: null });
    }
  }

  // Check optional headers
  for (const header of OPTIONAL_HEADERS) {
    maxScore += 5;
    if (headers[header]) {
      score += 5;
      results.push({ header, status: 'PASS', required: false, value: headers[header] });
    } else {
      results.push({ header, status: 'OPTIONAL', required: false, value: null });
    }
  }

  const percentage = Math.round((score / maxScore) * 100);
  let grade = 'F';
  
  if (percentage >= 90) grade = 'A+';
  else if (percentage >= 80) grade = 'A';
  else if (percentage >= 70) grade = 'B';
  else if (percentage >= 60) grade = 'C';
  else if (percentage >= 50) grade = 'D';

  return { score, maxScore, percentage, grade, results };
}

function printResults(url, data) {
  console.log(`\n🔒 Security Headers Test for: ${url}`);
  console.log(`📊 Score: ${data.score}/${data.maxScore} (${data.percentage}%) - Grade: ${data.grade}`);
  console.log(`📈 Status Code: ${data.statusCode || 'N/A'}\n`);

  console.log('📋 Header Details:');
  console.log('─'.repeat(80));
  
  data.results.forEach(result => {
    const status = result.status === 'PASS' ? '✅' : 
                  result.status === 'FAIL' ? '❌' : '⚠️';
    const required = result.required ? '[REQUIRED]' : '[OPTIONAL]';
    
    console.log(`${status} ${result.header.padEnd(30)} ${required.padEnd(12)} ${result.status}`);
    
    if (result.value) {
      const truncated = result.value.length > 60 ? 
        result.value.substring(0, 60) + '...' : 
        result.value;
      console.log(`   📝 ${truncated}`);
    }
    console.log();
  });

  // Recommendations
  const failedRequired = data.results.filter(r => r.required && r.status === 'FAIL');
  if (failedRequired.length > 0) {
    console.log('\n🔧 Recommendations:');
    console.log('─'.repeat(50));
    failedRequired.forEach(header => {
      console.log(`❌ Add ${header.header} header`);
    });
  }

  // Security Grade
  console.log('\n🎯 Security Grade Breakdown:');
  console.log('─'.repeat(30));
  console.log('A+ (90-100%): Excellent security');
  console.log('A  (80-89%):  Good security');
  console.log('B  (70-79%):  Adequate security');
  console.log('C  (60-69%):  Poor security');
  console.log('D  (50-59%):  Very poor security');
  console.log('F  (0-49%):   Fail - Major security issues');
}

async function main() {
  // Get URLs from command line arguments or use defaults
  const argUrls = process.argv.slice(2);
  const urls = argUrls.length > 0 ? argUrls : [
    'http://localhost:3006',
    'https://thongnhat.giakiemso.com'
  ];

  for (const url of urls) {
    try {
      console.log(`\n🔍 Testing ${url}...`);
      const response = await testHeaders(url);
      const analysis = calculateScore(response.headers);
      
      printResults(url, {
        ...analysis,
        statusCode: response.statusCode
      });
      
    } catch (error) {
      console.error(`❌ Error testing ${url}:`, error.message);
    }
  }

  console.log('\n✨ Test completed!');
  console.log('\n📚 Resources:');
  console.log('🔗 https://securityheaders.com/ - Online security headers scanner');
  console.log('🔗 https://observatory.mozilla.org/ - Mozilla Observatory');
  console.log('🔗 https://csp-evaluator.withgoogle.com/ - CSP Evaluator');
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = { testHeaders, calculateScore };