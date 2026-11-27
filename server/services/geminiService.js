const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

function summarizeTransactions(transactions = []) {
  const rows = Array.isArray(transactions) ? transactions : [];
  let income = 0;
  let expenses = 0;
  const expenseByCategory = new Map();

  for (const item of rows) {
    const amount = Number(item.amount) || 0;
    const type = String(item.type || "").toLowerCase();
    if (type === "income") {
      income += amount;
    } else if (type === "expense") {
      expenses += amount;
      const category = String(item.category || "Uncategorized").slice(0, 50);
      expenseByCategory.set(category, (expenseByCategory.get(category) || 0) + amount);
    }
  }

  const topCategories = [...expenseByCategory.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([category, amount]) => ({ category, amount: Math.round(amount * 100) / 100 }));

  const recentTransactions = rows.slice(-8).map((item) => ({
    type: item.type,
    title: String(item.title || "").slice(0, 60),
    amount: Number(item.amount) || 0,
    category: String(item.category || "Uncategorized").slice(0, 50),
    date: item.date ? new Date(item.date).toISOString().slice(0, 10) : null,
  }));

  return {
    transactionCount: rows.length,
    totalIncome: Math.round(income * 100) / 100,
    totalExpenses: Math.round(expenses * 100) / 100,
    netBalance: Math.round((income - expenses) * 100) / 100,
    topExpenseCategories: topCategories,
    recentTransactions,
  };
}

async function analyzeExpenses(transactions) {
  const summary = summarizeTransactions(transactions);
  const prompt = `
You are a practical personal-finance coach. Analyze this user's transaction summary:
${JSON.stringify(summary)}

Write a useful Markdown report of at most 180 words with these headings:
## 📊 Spending Summary
## 📂 Largest Expense Category
## 💰 Savings Suggestions
## 📈 Budget Advice
## ✅ Actionable Recommendations
## 🎯 Financial Health Score (0-100)
## 📅 Next Month Goal

Use only the supplied figures. Do not invent a budget or income. If there is too little data, say so and make the score provisional. Keep advice specific and concise. Return raw Markdown only.
`;

  try {
    const response = await client.chat.completions.create({
      model: "openrouter/free",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 1000,
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
