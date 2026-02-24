// Quick test script to verify API endpoints
const http = require('http');

function testEndpoint(method, path, data = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 3001,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json',
      }
    };

    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        console.log(`\n${method} ${path}`);
        console.log(`Status: ${res.statusCode}`);
        console.log(`Response: ${body}`);
        resolve({ status: res.statusCode, body });
      });
    });

    req.on('error', (error) => {
      console.error(`Error testing ${path}:`, error.message);
      reject(error);
    });

    if (data) {
      req.write(JSON.stringify(data));
    }
    req.end();
  });
}

async function runTests() {
  console.log('Testing Backend API...\n');
  console.log('='.repeat(50));

  try {
    // Test 1: Health check
    await testEndpoint('GET', '/health');

    // Test 2: Sessions list
    await testEndpoint('GET', '/api/sessions');

    // Test 3: Chat endpoint
    await testEndpoint('POST', '/api/chat', {
      sessionId: 'test-' + Date.now(),
      message: 'How do I reset my password?'
    });

    console.log('\n' + '='.repeat(50));
    console.log('All tests completed!');
  } catch (error) {
    console.error('\nTest failed:', error.message);
  }
}

runTests();
