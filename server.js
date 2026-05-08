const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { GoogleGenerativeAI } = require("@google/generative-ai");

dotenv.config({ path: './server/.env' });

console.log('GEMINI_API_KEY loaded:', !!process.env.GEMINI_API_KEY);

const app = express();

app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post("/generate", async (req, res) => {
  try {
    const { name, role, company, skills } = req.body;

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const prompt = `
    Write a professional cover letter for:

    Candidate Name: ${name}
    Job Role: ${role}
    Company Name: ${company}
    Skills: ${skills}

    Make it professional and impressive.
    `;

    const result = await model.generateContent(prompt);

    const response = result.response.text();

    res.json({
      success: true,
      letter: response,
    });

  } catch (error) {
    console.error('Generate error:', error);

    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});