const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/ask", async (req, res) => {
  try {
    const { message } = req.body;
    const hfResponse = await fetch(
      "https://api-inference.huggingface.co/models/google/flan-t5-base",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ inputs: message }),
      }
    );
    const data = await hfResponse.json();
    res.json({
      answer: data[0]?.generated_text || "Üzgünüm, cevap veremedim.",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
