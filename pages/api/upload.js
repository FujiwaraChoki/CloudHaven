import clientPromise from '../../mongo';

const handler = async (req, res) => {
    const client = await clientPromise;

    // Get file data from request body
    const { name, content, creation_date, size, type } = req.body;

    const collection = client.db('CloudHaven').collection('files');

    // Insert file into database
    await collection.insertOne({
        name: name,
        content: content,
        creation_date: creation_date,
        size: size,
        type: type,
    });

    console.log(`Uploaded file ${name} to database.`)

    res.status(200).json({
        success: true,
        link: `https://cloud-haven.vercel.app/download?file_name=${name}`,
    });
};

export default handler;