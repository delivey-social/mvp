import express from "express";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Service is online");
});

const port = 3000;
app.listen(port, () => {
  console.clear();
  console.log(`Server listening on port ${port}`);
});
