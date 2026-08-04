const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

async function analyzeExpenses(transactions) {
const prompt = `
You are a professional financial advisor.

Analyze these expense transactions:

${JSON.stringify(transactions, null, 2)}

Create a modern financial report.

Formatting rules:
- Use ## for main headings.
- Use ### for section titles.
- Use bullet points instead of long paragraphs.
- Use tables wherever appropriate.
- Highlight important numbers using **bold**.
- Use emojis before each section.
- Keep the response clean and readable.
- Do NOT wrap the response in code fences.
- Return only raw Markdown.

The report should contain:

## 📊 Spending Summary

## 📂 Largest Expense Category

## 💰 Savings Suggestions

## 📈 Budget Advice

## ✅ Actionable Recommendations

## 🎯 Overall Financial Health Score (0-100)

## 📅 Next Month Goal
`;

  try {
    const response = await client.chat.completions.create({
      model: "openrouter/free",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      max_tokens:700,
    });

let content = response.choices[0].message.content;

console.log("AI Raw Response:\n", content);

content = content
  .replace(/^```markdown\s*/i, "")
  .replace(/^```\s*/i, "")
  .replace(/```$/i, "")
  .trim();

return content;  } catch (error) {
    console.error("OpenRouter Error:", error);
    throw new Error("Failed to generate AI insights.");
  }
}

module.exports = { analyzeExpenses };
