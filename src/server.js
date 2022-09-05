const express = require("express");

const app = express();
const PORT = 3000;
process.env.PORT || PORT;

app.use(express.static("./dist"));
app.post('/api/form/save', function () {
  console.log('123');
})

app.listen(PORT, function () {
  console.log(`Example app listening on port ${PORT}!`);
});
