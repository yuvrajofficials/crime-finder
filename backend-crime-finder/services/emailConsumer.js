import { Kafka } from 'kafkajs';
import dotenv from 'dotenv';
import { sendAlertEmail } from '../utils/emailNotifier.js';
dotenv.config();

import { kafka } from './kafkaInstance.js';

const consumer = kafka.consumer({ groupId: 'email-group' });

const run = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: 'criminal-detected', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ message }) => {
      try {
        const data = JSON.parse(message.value.toString());
        console.log("📩 Email Triggered For:", data.name);

        await sendAlertEmail(data.name, "Criminal Record Detected");
        return
      } catch (error) {
        console.error("❌ Error sending email:", error.message);
      }
    },
  });
};

run().catch(console.error);
