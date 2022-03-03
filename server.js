const express = require("express");
const { Thing, data } = require("./db");
const path = require("path");

const app = express();

app.get("/", async (req, res, next) => {
  try {
    res.sendFile(path.join(__dirname, "./html/index.html"));
  } catch (ex) {
    next(ex);
  }
});

app.get("/api/thing", async (req, res, next) => {
  try {
    res.send(await Thing.findAll());
  } catch (ex) {
    next(ex);
  }
});

app.post("/api/thing", async (req, res, next) => {
  try {
    await Thing.create({ name: req.body.name });
    res.sendStatus(201);
  } catch (ex) {
    next(ex);
  }
});

app.delete("/api/thing/:id", async (req, res, next) => {
  try {
    const thingToDelete = await Thing.findByPk(req.params.id);
    await thingToDelete.destroy();
    res.sendStatus(204);
  } catch (ex) {
    next(ex);
  }
});

const start = async () => {
  try {
    await data();
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`server listening at PORT ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
};

start();
