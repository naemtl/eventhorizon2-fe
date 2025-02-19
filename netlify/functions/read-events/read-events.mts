import { MongoClient } from 'mongodb';

const url: string = process.env.MONGO_URL!;
const dbName: string = process.env.MONGO_DB_NAME!;
const collectionName: string = process.env.MONGO_MAIN_COLLECTION!;

const client = new MongoClient(url);

export default async (request) => {
  try {
    if (!request.url) {
      return new Response(JSON.stringify({ error: 'Invalid request URL' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const url = new URL(request.url);
    const query = url.searchParams;
    const { date, keyword, source, sort, page = '1', limit = '12' } = Object.fromEntries(query);

    const queryFilter: any = {};
    const sortOptions: any = {};

    if (date) {
      queryFilter.dateShowTime = { $gte: new Date(date) };
    }

    if (keyword) {
      queryFilter.title = { $regex: keyword, $options: 'i' };
    }

    if (source) {
      queryFilter.source = source;
    }

    if (sort === 'date') {
      sortOptions.dateShowTime = 1;
    }

    await client.connect();
    const db = client.db(dbName);
    const eventsCollection = db.collection(collectionName);

    const skip = (Number(page) - 1) * Number(limit);

    const events = await eventsCollection
      .find(queryFilter)
      .sort(sortOptions)
      .skip(skip)
      .limit(Number(limit))
      .toArray();

    return new Response(JSON.stringify(events), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Accept, Cache-Control',
      },
    });
  }
  catch (error) {
    console.error('Error querying events:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  finally {
    await client.close();
  }
};
