const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

async function analyzeExpenses(transactions) {
  // Keep the prompt compact so free model routes have enough output budget.
  const prompt = `
Act as a practical personal-finance coach. Analyze this transaction data:
${JSON.stringify(transactions)}

Return a concise Markdown report (maximum 350 words). Use only the data provided; do not invent income, budgets, dates, or transactions. If data is insufficient, say so clearly.

Include these sections:
## 📊 Spending Summary
## 📂 Largest Expense Category
## 💰 Savings Suggestions
## 📈 Budget Advice
## ✅ Actionable Recommendations
## 🎯 Financial Health Score (0-100)
## 📅 Next Month Goal

Use short bullets, explain the score briefly, and avoid large tables. Return raw Markdown only, without code fences.
`;

  try {
    const response = await client.chat.completions.create({
      model: "openrouter/free",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 2000,
    });

    const content = response.choices?.[0]?.message?.content;

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
