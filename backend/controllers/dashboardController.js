const Sales = require("../models/Sales");
const Finance = require("../models/Finance");

exports.getSalesOverview = async (req, res) => {
  try {
    const salesData = await Sales.find();
    res.status(200).json(salesData);
  } catch (error) {
    res.status(500).json({ message: "Error fetching sales data", error });
  }
};

exports.getFinanceOverview = async (req, res) => {
  try {
    const financeData = await Finance.find();
    res.status(200).json(financeData);
  } catch (error) {
    res.status(500).json({ message: "Error fetching financial overview", error });
  }
};
