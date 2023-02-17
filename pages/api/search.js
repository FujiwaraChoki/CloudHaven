import clientPromise from '../../mongo';

export default async function (_, res) {
  const client = await clientPromise;
  const collection = client.db("CloudHaven").collection('files');
  const data = await collection.find().toArray();
  res.status(200).json({
    files: data,
  });
};