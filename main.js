const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const {stringify} = require('flatted');

const app = express();
const port = 8080;

app.use(bodyParser.json({limit: '50mb'}));

app.get('/', () => {
  return "Ready to rock n roll";
})
app.post('/ms/webhook/received', async (req, res) => {
  const event = req.body.type;
  const data = req.body;

  await axios.post("https://staging.lenna.ai/app/public/api/webhook/email/received", data)
    .then(function (res) {
    console.log("Success ");
    })
    .catch(function (error) {
    console.log(error);
  });

  res.status(200).json({
    message: 'success',
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
