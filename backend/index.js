const express = require("express");
const cors = require("cors");
const app = express();
const mainRouter = require("./router/index");

app.use(cors());
app.use(express.json());

app.use("api/v1", mainRouter);
app.listen(3000);
