const http = require("http");
const app = require("./app");

const port = process.env.PORt || 4000;


const server = http.createServer(app);

app.listen(port, () => {
  console.log(`server is running at ${process.env.PORT || 4000}`);
});
