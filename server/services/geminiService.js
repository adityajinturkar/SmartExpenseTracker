const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

async function analyzeExpenses(transactions) {
  const prompt = `
You are an expert financial advisor.

Analyze these expense transactions:

${JSON.stringify(transactions, null, 2)}

Provide:

1. Spending Summary
2. Largest Expense Category
3. Savings Suggestions
4. Budget Advice
5. Three actionable recommendations

Respond in Markdown.
`;

  try {
    const response = await client.chat.completions.create({
      model: "openrouter/auto",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("OpenRouter Error:", error);
    throw new Error("Failed to generate AI insights.");
  }
}

module.exports = { analyzeExpenses };
