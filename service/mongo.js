const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const dbName = 'startupDatabase'
const collectionName = 'content';

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}/${dbName}`;
const client = new MongoClient(url);

async function run() {
    try {
        await client.connect();

        const collection = client.db(dbName).collection(collectionName);

        // Insert a record
        const house = {
            name: 'Beachfront views',
            summary: 'From your bedroom to the beach, no shoes required',
            property_type: 'Condo',
            beds: 1,
        };
        await collection.insertOne(house);

        // See if we can get that record
        const cursor = collection.find();
        const rentals = await cursor.toArray();
        rentals.forEach((i) => console.log(i));
    } catch (error) {
        console.error('Error occurred:', error);
    } finally {
        await client.close();
    }
}

run().catch(console.error);




