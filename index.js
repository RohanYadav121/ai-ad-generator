require("dotenv").config();
const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.post("/generate", async (req, res) => {
  try {
    const { product } = req.body;

    const response = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "user",
          content: `Write 3 ad copies for: ${product}`
        }
      ],
    });

    res.json({ result: response.choices[0].message.content });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error generating ads" });
  }
});

app.listen(3000, () => {
  console.log("Server running on https://ai-ad-generator-pfv3.onrender.com");
});