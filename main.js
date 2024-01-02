const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const {stringify} = require('flatted');

const app = express();
const port = 3030;

app.use(bodyParser.json({limit: '50mb'}));

app.post('/ms/webhook/received', async (req, res) => {
  const event = req.body.type;
  const data = req.body;

  await axios.post("http://platform.lenna.test/app/public/api/webhook/email/received", data)
    .then(function (res) {
      res.status(200).end();
    })
    .catch(function (error) {
      console.log(error);
    });

});

// app.post('/ms/webhook/sent', async (req, res) => {
//   const event = req.body.type;
//   const data = req.body;

//   console.log("sent ", data);
//   await axios.post("http://platform.lenna.test/app/public/api/webhook/email/set-message-id", data)
//     .then(function (res) {
//       console.log("Message ID updated.");
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
// });

app.listen(port, () => {
  console.log('payload');
});
