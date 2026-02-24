// Test different Gemini models
require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function testModel(modelName) {
  try {
    console.log(`\nTesting model: ${modelName}`);
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: modelName });
    
    const result = await model.generateContent('Say hello');
    const response = await result.response;
    const text = response.text();
    
    console.log(`✅ SUCCESS with ${modelName}`);
    console.log(`Response: ${text}`);
    return true;
  } catch (error) {
    console.log(`❌ FAILED with ${modelName}`);
    console.log(`Error: ${error.message.substring(0, 100)}...`);
    return false;
  }
}

async function findWorkingModel() {
  const modelsToTry = [
    'gemini-pro',
    'gemini-1.0-pro',
    'gemini-1.5-pro',
    'gemini-1.5-flash',
    'models/gemini-pro',
    'models/gemini-1.0-pro'
  ];

  console.log('Finding working Gemini model...');
  console.log('API Key:', process.env.GEMINI_API_KEY ? 'Found' : 'Missing');
  
  for (const model of modelsToTry) {
    const success = await testModel(model);
    if (success) {
      console.log(`\n🎉 Use this model: ${model}`);
      break;
    }
  }
}

findWorkingModel();
