const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const amqp = require('amqplib') // Import library amqp
const {stringify} = require('flatted');

const app = express();
const port = 8080;
app.use(bodyParser.json({limit: '50mb'}));

amqp.connect('amqps://txnploij:HX2L2iwb1K8SO4WG2XbU9X4VthrBTXeM@armadillo.rmq.cloudamqp.com/txnploij')
  .then(async conn=> {
    return conn.createChannel().then(ch => {
      // Deklarasi antrian
      var que = 'broadcast.email.postmark';
      ch.assertQueue(que, { durable: true })
      ch.prefetch(1);
      console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", que);
      ch.consume(que, function(msg) {
        var secs = msg.content.toString().split('.').length - 1;
        setTimeout(function() {
          console.log(" [x] Done", msg);
        }, secs * 2000);
      });
    })
}).catch(console.warn);

app.listen(port, () => {
  console.log('payload');
});
