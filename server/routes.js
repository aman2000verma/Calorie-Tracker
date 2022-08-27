const express = require("express");
const router = express.Router();
const service = require("./service");

router.get("/search/:text", async (req, res) => {
  let text = req.params.text;
  await service
    .getItems(text)
    .then((response) => {
      res.send(response.data);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(503);
    });
});

router.get("/nutrition/:item", async (req, res) => {
  let item = req.params.item;
  await service
    .getNutritionInfo(item)
    .then((response) => {
      res.send(response.data);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(503);
    });
});

router.get("/log/:date", async (req, res) => {
  const date = req.params.date;
  const [d, m, y] = date.split("-");
  const DATE = new Date(y, parseInt(m) - 1, parseInt(d), 18, 30);
  const data = await service.getDayDetails(DATE);
  res.send(data);
});

router.post("/log", async (req, res) => {
  const data = req.body;
  console.log(data);
  await service
    .logFood(data.date, data.item)
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(503);
    });
});

router.patch("/log/:id", async (req, res) => {
  const id = req.params.id;
  await service
    .logFoodToDate(id, req.body.item)
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(503);
    });
});

router.delete("/log/:id/:index", async (req, res) => {
  await service
    .deleteFoodFromDate(req.params.id, req.params.index)
    .then((response) => res.send(response))
    .catch((err) => {
      console.error(err);
      res.sendStatus(503);
    });
});

module.exports = router;
