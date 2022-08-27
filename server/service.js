const axios = require("axios");
require("dotenv").config();
const Log = require("./model");

const getItems = async (searchText) => {
  const url = `https://trackapi.nutritionix.com/v2/search/instant?query=${searchText}`;
  const headers = {
    "x-app-id": process.env.App,
    "x-app-key": process.env.Key,
  };

  return await axios.get(url, { headers });
};

const getNutritionInfo = async (item) => {
  const url = "https://trackapi.nutritionix.com/v2/natural/nutrients";
  const data = {
    query: item,
  };
  const headers = {
    "x-app-id": process.env.App,
    "x-app-key": process.env.Key,
    "Content-Type": "application/json",
  };
  return await axios.post(url, data, { headers });
};

const getDayDetails = async (DATE) => {
  const data = await Log.find({ date: DATE });
  console.log(DATE, data);
  return data;
};

const logFood = async (date, item) => {
  const newData = new Log({ date: date, foodLog: [item] });
  const insertedData = await newData.save();
  console.log(insertedData);
  return insertedData;
};

const logFoodToDate = async (id, item) => {
  const existing = await Log.findOne({ _id: id });
  const updated = await Log.updateOne(
    { _id: id },
    { foodLog: [...existing.foodLog, item] }
  );
  console.log(updated);
  return updated;
};

const deleteFoodFromDate = async (id, index) => {
  const existing = await Log.findOne({ _id: id });
  const foodLog = existing.foodLog;
  foodLog.splice(index, 1);
  const updated = await Log.updateOne(
    {
      _id: id,
    },
    {
      foodLog: foodLog,
    }
  );
  console.log(updated);
  return updated;
};

module.exports = {
  getItems,
  getNutritionInfo,
  getDayDetails,
  logFood,
  logFoodToDate,
  deleteFoodFromDate,
};
