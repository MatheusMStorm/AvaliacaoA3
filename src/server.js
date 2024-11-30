require("dotenv").config();

const app = require('./app');
const port = process.env.PORT;

app.get("/", (req, res) => {
  res.send("API rodando!");
});

app.listen(port, () => {
  console.log(`API rodando na porta ${port}`);
});
