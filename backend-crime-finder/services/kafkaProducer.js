// kafkaProducer.js
import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'crime-producer',
  brokers: ['localhost:9092'],
});

const producer = kafka.producer();

const sendToKafka = async (topic, data) => {
  await producer.connect();

  await producer.send({
    topic,
    messages: [{ value: JSON.stringify(data) }],
  });

  await producer.disconnect();
};

export default sendToKafka;
