const Transaction = require("../models/Transaction");
const { analyzeExpenses } = require("../services/geminiService");

exports.getInsights = async (req, res) => {
  try {
    const transactions = await Transaction.find({
      user: req.user.id,
    });

    const insights = await analyzeExpenses(transactions);

    res.json({
      success: true,
      insights,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "AI analysis failed",
    });
  }
};
