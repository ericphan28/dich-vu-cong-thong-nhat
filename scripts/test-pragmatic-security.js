#!/usr/bin/env node

/**
 * Pragmatic Security Monitor
 * Focuses on high-impact security headers vs cosmetic improvements
 */

const https = require('https');
const http = require('http');

const CRITICAL_SECURITY_HEADERS = [
  { name: 'content-security-policy', weight: 30, critical: true },
  { name: 'strict-transport-security', weight: 25, critical: true },
  { name: 'x-frame-options', weight: 20, critical: true },
  { name: 'x-content-type-options', weight: 15, critical: true },
  { name: 'referrer-policy', weight: 10, critical: true }
];

const PLATFORM_HEADERS = [
  'server',
  'x-vercel-id',
  'x-vercel-cache',
  'x-nextjs-prerender',
  'x-nextjs-stale-time'
];

const CUSTOM_HEADERS = [
  'x-powered-by'
];

async function testHeaders(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https:') ? https : http;
    
    const req = client.request(url, { method: 'HEAD' }, (res) => {
      const headers = {};
      
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

function analyzePragmaticSecurity(headers) {
  const analysis = {
    critical: [],
    platform: [],
    custom: [],
    securityScore: 0,
    maxSecurityScore: 100,
    platformDisclosure: 0,
    recommendations: []
  };

  // Analyze critical security headers
  for (const header of CRITICAL_SECURITY_HEADERS) {
    if (headers[header.name]) {
      analysis.critical.push({
        header: header.name,
        value: headers[header.name],
        status: 'PRESENT',
        weight: header.weight,
        impact: 'HIGH'
      });
      analysis.securityScore += header.weight;
    } else {
      analysis.critical.push({
        header: header.name,
        value: null,
        status: 'MISSING',
        weight: header.weight,
        impact: 'HIGH'
      });
      analysis.recommendations.push(`❌ Critical: Add ${header.name} header`);
    }
  }

  // Analyze platform headers (acceptance vs concern)
  for (const header of PLATFORM_HEADERS) {
    if (headers[header]) {
      analysis.platform.push({
        header: header,
        value: headers[header],
        status: 'VISIBLE',
        concern: 'LOW',
        note: 'Platform requirement - acceptable'
      });
      analysis.platformDisclosure += 5; // Minor disclosure score
    }
  }

  // Analyze custom headers
  for (const header of CUSTOM_HEADERS) {
    if (headers[header]) {
      const isCustom = !headers[header].toLowerCase().includes('vercel') && 
                      !headers[header].toLowerCase().includes('next');
      analysis.custom.push({
        header: header,
        value: headers[header],
        status: isCustom ? 'CUSTOMIZED' : 'DEFAULT',
        impact: isCustom ? 'POSITIVE' : 'NEUTRAL'
      });
    }
  }

  // Calculate overall grades
  const securityGrade = analysis.securityScore >= 90 ? 'A+' : 
                       analysis.securityScore >= 80 ? 'A' : 
                       analysis.securityScore >= 70 ? 'B' : 
                       analysis.securityScore >= 60 ? 'C' : 'F';

  const privacyScore = Math.max(0, 100 - analysis.platformDisclosure);
  const privacyGrade = privacyScore >= 90 ? 'A+' : 
                      privacyScore >= 80 ? 'A' : 
                      privacyScore >= 70 ? 'B' : 
                      privacyScore >= 60 ? 'C' : 'F';

  return { 
    ...analysis, 
    securityGrade, 
    privacyScore, 
    privacyGrade,
    overallAssessment: securityGrade === 'A+' && privacyGrade >= 'B' ? 'EXCELLENT' :
                      securityGrade === 'A+' && privacyGrade >= 'C' ? 'GOOD' :
                      securityGrade >= 'A' ? 'ACCEPTABLE' : 'NEEDS_IMPROVEMENT'
  };
}

function printPragmaticAnalysis(url, data) {
  console.log(`\n🛡️ Pragmatic Security Analysis: ${url}`);
  console.log(`📊 Security Score: ${data.securityScore}/${data.maxSecurityScore} (${data.securityGrade})`);
  console.log(`🔒 Privacy Score: ${data.privacyScore}/100 (${data.privacyGrade})`);
  console.log(`🎯 Overall: ${data.overallAssessment}\n`);

  // Critical Security Headers
  console.log('🔴 CRITICAL SECURITY HEADERS:');
  console.log('─'.repeat(60));
  data.critical.forEach(item => {
    const emoji = item.status === 'PRESENT' ? '✅' : '❌';
    const weight = `(${item.weight}pts)`;
    console.log(`${emoji} ${item.header} ${weight}: ${item.status}`);
    if (item.value) {
      const truncated = item.value.length > 50 ? 
        item.value.substring(0, 50) + '...' : item.value;
      console.log(`   📝 ${truncated}`);
    }
    console.log();
  });

  // Platform Headers (Acceptance)
  if (data.platform.length > 0) {
    console.log('🏗️ PLATFORM HEADERS (Managed Infrastructure):');
    console.log('─'.repeat(60));
    data.platform.forEach(item => {
      console.log(`ℹ️ ${item.header}: ${item.status} - ${item.note}`);
      const truncated = item.value.length > 50 ? 
        item.value.substring(0, 50) + '...' : item.value;
      console.log(`   📝 ${truncated}`);
      console.log(`   🎯 Security Impact: ${item.concern}\n`);
    });
  }

  // Custom Headers
  if (data.custom.length > 0) {
    console.log('⚙️ CUSTOM HEADERS:');
    console.log('─'.repeat(60));
    data.custom.forEach(item => {
      const emoji = item.status === 'CUSTOMIZED' ? '✅' : '⚠️';
      console.log(`${emoji} ${item.header}: ${item.status} (${item.impact})`);
      console.log(`   📝 ${item.value}\n`);
    });
  }

  // Recommendations
  if (data.recommendations.length > 0) {
    console.log('🔧 ACTIONABLE RECOMMENDATIONS:');
    console.log('─'.repeat(50));
    data.recommendations.forEach(rec => console.log(rec));
    console.log();
  }

  // Risk Assessment
  console.log('🎯 PRAGMATIC RISK ASSESSMENT:');
  console.log('─'.repeat(40));
  
  if (data.securityGrade === 'A+') {
    console.log('✅ STRONG: Critical attack vectors protected');
  } else if (data.securityGrade === 'A') {
    console.log('✅ GOOD: Major attack vectors protected');
  } else {
    console.log('❌ VULNERABLE: Critical security gaps exist');
  }

  if (data.platformDisclosure <= 25) {
    console.log('✅ ACCEPTABLE: Platform visibility within normal range');
  } else {
    console.log('⚠️ HIGH VISIBILITY: Consider additional privacy measures');
  }

  // Business Impact
  console.log('\n💼 BUSINESS IMPACT:');
  console.log('─'.repeat(25));
  if (data.overallAssessment === 'EXCELLENT') {
    console.log('🟢 Ready for production - excellent security posture');
  } else if (data.overallAssessment === 'GOOD') {
    console.log('🟡 Production ready - monitor for improvements');
  } else if (data.overallAssessment === 'ACCEPTABLE') {
    console.log('🟡 Production viable - prioritize security improvements');
  } else {
    console.log('🔴 Security review required before production');
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
      const analysis = analyzePragmaticSecurity(response.headers);
      
      printPragmaticAnalysis(url, analysis);
      
    } catch (error) {
      console.error(`❌ Error testing ${url}:`, error.message);
    }
  }

  console.log('\n✨ Pragmatic security analysis completed!');
  console.log('\n💡 Focus on high-impact security over cosmetic perfection');
  console.log('🔗 https://securityheaders.com/ - Verify security grade');
}

if (require.main === module) {
  main();
}

module.exports = { testHeaders, analyzePragmaticSecurity };