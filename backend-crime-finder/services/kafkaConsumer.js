
import dotenv from "dotenv";
import scrapePersonDetailsByName from '../utils/webScrapper.js';
import pool from '../config/db.js';

dotenv.config();

import { kafka } from './kafkaInstance.js';

const consumer = kafka.consumer({ groupId: 'scraper-group' });
const producer = kafka.producer();
const SCRAPING_WEBSITE_URI = process.env.SCRAPING_WEBSITE_URI;

const run = async () => {

  await consumer.connect();
  await producer.connect();
  await consumer.subscribe({ topic: 'person-data', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ message }) => {
      try {
        const person = JSON.parse(message.value.toString());
        console.log("🔍 Processing:", person);

        const scrapedDetails = await scrapePersonDetailsByName(SCRAPING_WEBSITE_URI, person.name);
        console.log("Scraped:", scrapedDetails);

        const criminalLine = scrapedDetails
          ?.split('\n')
          .find(line => line.toLowerCase().includes('criminal record'));

        let status = 'verified'; 

        if (criminalLine && criminalLine.toLowerCase().includes('yes')) {
          status = 'criminal';

          // Send message to another topic
          await producer.send({
            topic: 'criminal-detected',
            messages: [
              {
                value: JSON.stringify({
                  name: person.name,
                  id: person.id,
                  timestamp: new Date(),
                }),
              },
            ],
          });

          console.log("🚨 Criminal detected:", person.name);
        } else {
          console.log("✅ Verified:", person.name);
        }

        // Save to database
        await pool.query(
          "UPDATE verificationusers SET status = $1 WHERE name = $2",
          [status, person.name]
        );

      } catch (err) {
        console.error("❌ Error processing message:", err.message);
      }
    },
  });
};

run().catch(console.error);
