// Complete test of all features
const http = require('http');

function makeRequest(method, path, data = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 3001,
      path: path,
      method: method,
      headers: { 'Content-Type': 'application/json' }
    };

    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => resolve({ status: res.statusCode, body: JSON.parse(body) }));
    });

    req.on('error', reject);
    if (data) req.write(JSON.stringify(data));
    req.end();
  });
}

async function runFullTest() {
  console.log('╔══════════════════════════════════════════════════════════════╗');
  console.log('║                                                              ║');
  console.log('║          🧪 FULL APPLICATION TEST                            ║');
  console.log('║                                                              ║');
  console.log('╚══════════════════════════════════════════════════════════════╝\n');

  const sessionId = 'test-' + Date.now();
  let passed = 0;
  let failed = 0;

  // Test 1: Health Check
  console.log('Test 1: Health Check');
  console.log('─'.repeat(60));
  try {
    const result = await makeRequest('GET', '/health');
    if (result.status === 200 && result.body.status === 'ok') {
      console.log('✅ PASSED - Backend is healthy');
      passed++;
    } else {
      console.log('❌ FAILED - Unexpected response');
      failed++;
    }
  } catch (error) {
    console.log('❌ FAILED -', error.message);
    failed++;
  }
  console.log('');

  // Test 2: Chat - Password Question
  console.log('Test 2: Chat - Password Reset Question');
  console.log('─'.repeat(60));
  try {
    const result = await makeRequest('POST', '/api/chat', {
      sessionId,
      message: 'How do I reset my password?'
    });
    if (result.status === 200 && result.body.reply) {
      console.log('✅ PASSED - Got response');
      console.log('   Question: How do I reset my password?');
      console.log('   Answer:', result.body.reply.substring(0, 80) + '...');
      console.log('   Tokens:', result.body.tokensUsed);
      passed++;
    } else {
      console.log('❌ FAILED - No reply received');
      failed++;
    }
  } catch (error) {
    console.log('❌ FAILED -', error.message);
    failed++;
  }
  console.log('');

  // Test 3: Chat - Refund Question
  console.log('Test 3: Chat - Refund Policy Question');
  console.log('─'.repeat(60));
  try {
    const result = await makeRequest('POST', '/api/chat', {
      sessionId,
      message: 'What is your refund policy?'
    });
    if (result.status === 200 && result.body.reply) {
      console.log('✅ PASSED - Got response');
      console.log('   Question: What is your refund policy?');
      console.log('   Answer:', result.body.reply.substring(0, 80) + '...');
      passed++;
    } else {
      console.log('❌ FAILED - No reply received');
      failed++;
    }
  } catch (error) {
    console.log('❌ FAILED -', error.message);
    failed++;
  }
  console.log('');

  // Test 4: Chat - Out of Scope Question
  console.log('Test 4: Chat - Out of Scope Question');
  console.log('─'.repeat(60));
  try {
    const result = await makeRequest('POST', '/api/chat', {
      sessionId,
      message: 'What is the weather today?'
    });
    if (result.status === 200 && result.body.reply.includes("Sorry")) {
      console.log('✅ PASSED - Correctly rejected out-of-scope question');
      console.log('   Question: What is the weather today?');
      console.log('   Answer:', result.body.reply);
      passed++;
    } else {
      console.log('❌ FAILED - Should have rejected the question');
      failed++;
    }
  } catch (error) {
    console.log('❌ FAILED -', error.message);
    failed++;
  }
  console.log('');

  // Test 5: Get Conversation History
  console.log('Test 5: Get Conversation History');
  console.log('─'.repeat(60));
  try {
    const result = await makeRequest('GET', `/api/conversations/${sessionId}`);
    if (result.status === 200 && result.body.messages && result.body.messages.length >= 6) {
      console.log('✅ PASSED - Retrieved conversation history');
      console.log('   Messages in conversation:', result.body.messages.length);
      console.log('   Expected: 6 (3 questions + 3 answers)');
      passed++;
    } else {
      console.log('❌ FAILED - Incorrect message count');
      console.log('   Got:', result.body.messages ? result.body.messages.length : 0);
      failed++;
    }
  } catch (error) {
    console.log('❌ FAILED -', error.message);
    failed++;
  }
  console.log('');

  // Test 6: List Sessions
  console.log('Test 6: List All Sessions');
  console.log('─'.repeat(60));
  try {
    const result = await makeRequest('GET', '/api/sessions');
    if (result.status === 200 && result.body.sessions) {
      console.log('✅ PASSED - Retrieved sessions list');
      console.log('   Total sessions:', result.body.sessions.length);
      const ourSession = result.body.sessions.find(s => s.sessionId === sessionId);
      if (ourSession) {
        console.log('   Our test session found:', sessionId.substring(0, 20) + '...');
      }
      passed++;
    } else {
      console.log('❌ FAILED - Could not retrieve sessions');
      failed++;
    }
  } catch (error) {
    console.log('❌ FAILED -', error.message);
    failed++;
  }
  console.log('');

  // Summary
  console.log('═'.repeat(60));
  console.log('📊 TEST SUMMARY');
  console.log('═'.repeat(60));
  console.log(`✅ Passed: ${passed}/6`);
  console.log(`❌ Failed: ${failed}/6`);
  console.log('');

  if (failed === 0) {
    console.log('🎉 ALL TESTS PASSED! Application is fully functional!');
    console.log('');
    console.log('✅ You can now:');
    console.log('   1. Start the frontend: cd frontend && npm start');
    console.log('   2. Test in browser at http://localhost:3000');
    console.log('   3. Submit your assignment!');
  } else {
    console.log('⚠️  Some tests failed. Check the errors above.');
  }
  console.log('');
  console.log('═'.repeat(60));
}

runFullTest();
