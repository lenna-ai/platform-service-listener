const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const amqp = require('amqplib') // Import library amqp
const {stringify} = require('flatted');

const app = express();
const port = 8080;
app.use(bodyParser.json({limit: '50mb'}));

amqp.connect('amqps://gctnabkn:O5fogenqWYlIFt6E_8TNDd0WH914UHEL@armadillo.rmq.cloudamqp.com/gctnabkn')
  .then(async conn=> {
    return conn.createChannel().then(ch => {
      // Deklarasi antrian
      var que = 'broadcast.email.postmark';
      ch.assertQueue(que, { durable: true })
      ch.prefetch(1);
      console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", que);
      ch.consume(que, function(msg) {
        console.log("Message content", JSON.parse(msg.content));
        var secs = msg.content.toString().split('.').length - 1;

        setTimeout(function() {
          axios.post('https://staging.lenna.ai/app/public/api/webhook/email/broadcast', JSON.parse(msg.content))
            .then(function (response) {
              console.log("response ", response.data);
            })
            .catch(function (error) {
              console.log(error);
            });
          console.log(" [x] Done");
        }, secs * 2000);
        ch.ack(msg);
      });
    })
}).catch(console.log);
