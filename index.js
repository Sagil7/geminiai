const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const PORT = 5000;
const API_KEY = "AIzaSyDU0XtbZCsMFlIbry2dkwkEIHygnsfe-r8";
const genAI = new GoogleGenerativeAI(API_KEY);

app.use(cors());
app.use(bodyParser.json());

app.post('/article', async (req, res) => { 
  const prompt = req.body.prompt;
  console.log("Received prompt:", prompt);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  try {
    const result = await model.generateContent(prompt);
    console.log("Result from API:", result);
    const response = result.response;
    res.json(response);
  } catch (error) {
    console.error("Error from API:", error);
    res.json(error);
  }
});

app.listen(PORT, () => { 
  console.log(`Server is running on http://localhost:${PORT}`); 
});