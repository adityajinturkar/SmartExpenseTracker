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
      messages: [{ role: "user", content: prompt }],
      max_tokens: 700,
    });

    const content = response.choices?.[0]?.message?.content;

    // Some free-model routes can return a successful response with no text.
    // Handle that explicitly instead of crashing on content.replace().
    if (typeof content !== "string" || !content.trim()) {
      console.error("OpenRouter returned an empty AI response:", {
        finishReason: response.choices?.[0]?.finish_reason ?? null,
        hasChoices: Array.isArray(response.choices) && response.choices.length > 0,
      });
      throw new Error("The AI provider returned an empty response. Please try again.");
    }

    return content
      .replace(/^\`\`\`markdown\s*/i, "")
      .replace(/^\`\`\`\s*/i, "")
      .replace(/\`\`\`$/i, "")
      .trim();
  } catch (error) {
    console.error("OpenRouter Error:", error.message);
    throw new Error("Failed to generate AI insights. Please try again.");
  }
}

module.exports = { analyzeExpenses };
