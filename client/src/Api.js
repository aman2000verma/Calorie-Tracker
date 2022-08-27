import axios from "axios";

const search = (text) => {
  return axios.get(`http://localhost:5000/api/search/${text}`);
};

const nutrition = (food) => {
  return axios.get(`http://localhost:5000/api/nutrition/${food}`);
};

const getDay = (day) => {
  //15-08-2022
  return axios.get(`http://localhost:5000/api/log/${day}`);
};

const newlog = (data) => {
  // {
  //     "date": "2022-09-14T18:30:00.000Z",
  //     "item": {
  //         "name": "pizza",
  //         "calories": 700
  //     }
  // }
  return axios.post("http://localhost:5000/api/log/", data);
};

const updateLog = (id, data) => {
  // {
  //     "item": {
  //         "name": "ice cream",
  //         "calories": 500
  //     }
  // }
  return axios.patch(`http://localhost:5000/api/log/${id}`, data);
};

const deleteLog = (id, itemNo) => {
  return axios.delete(`http://localhost:5000/api/log/${id}/${itemNo}`);
};

const Api = {
  searchFood: search,
  getNutrition: nutrition,
  fetchDayDetails: getDay,
  addNewLog: newlog,
  updateLogById: updateLog,
  deleteLogById: deleteLog,
};
export default Api;
