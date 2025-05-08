const Sale = require("../models/Sales");

// Existing function to record a sale
const recordSale = async (req, res) => {
  try {
    const { productName, price, quantity } = req.body;

    const newSale = new Sale({ productName, price, quantity });
    await newSale.save();

    res.status(201).json({ message: "✅ Sale recorded successfully!", sale: newSale });
  } catch (error) {
    console.error("  Error saving sale:", error);
    res.status(500).json({ error: "  Failed to record sale." });
  }
};

// Existing function to get all sales
const getAllSales = async (req, res) => {
  try {
    const sales = await Sale.find({}, { buyerEmail: 0 }); // ✅ Prevents sending email data
    res.json(sales);
  } catch (error) {
    console.error(" Error fetching sales data:", error);
    res.status(500).json({ error: " Failed to retrieve sales." });
  }
};

// New function to get aggregated sales data for charting
const getAggregatedSalesData = async (req, res) => {
  try {
    const { period } = req.query; // 'day' or 'month'

    let aggregationPipeline = [
      {
        $project: {
          amount: { $multiply: ["$price", "$quantity"] },
          purchaseDate: 1, // The date field
        },
      },
    ];

    if (period === 'day') {
      aggregationPipeline.push({
        $project: {
          date: { $dateToString: { format: "%Y-%m-%d", date: "$purchaseDate" } }, // Group by day
          amount: 1,
        },
      });
    } else if (period === 'month') {
      aggregationPipeline.push({
        $project: {
          month: { $month: "$purchaseDate" },
          year: { $year: "$purchaseDate" },
          amount: 1,
        },
      });
      aggregationPipeline.push({
        $project: {
          date: { $concat: [{ $toString: "$year" }, "-", { $toString: "$month" }] }, // Group by YYYY-MM
          amount: 1,
        },
      });
    }

    aggregationPipeline.push({
      $group: {
        _id: "$date", // Group by the formatted date (either day or month)
        totalSales: { $sum: "$amount" }, // Sum the amounts for each period
      },
    });

    aggregationPipeline.push({
      $sort: { "_id": 1 }, // Sort by date in ascending order
    });

    const result = await Sale.aggregate(aggregationPipeline);

    // Format the response
    const labels = result.map((data) => data._id); // Dates
    const values = result.map((data) => data.totalSales); // Sales totals

    res.json({
      labels,
      values,
    });
  } catch (error) {
    console.error(" Error fetching aggregated sales data:", error);
    res.status(500).json({ error: " Failed to retrieve aggregated sales data." });
  }
};

module.exports = { recordSale, getAllSales, getAggregatedSalesData };
