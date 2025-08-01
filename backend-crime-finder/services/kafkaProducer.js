// kafkaProducer.js
import { kafka } from './kafkaInstance.js';


const producer = kafka.producer();
await producer.connect();

const sendToKafka = async (topic, data) => {

  await producer.send({
    topic,
    messages: [{ value: JSON.stringify(data) }],
  });

};



export default sendToKafka;
