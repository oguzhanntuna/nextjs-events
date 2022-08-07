import { MongoClient } from "mongodb";

const handler = async (req, res) => {
  const { eventId } = req.query;

  const client = await MongoClient.connect(
    "mongodb+srv://oguzhanntuna:Lincolnn97..@cluster0.0c8jg5d.mongodb.net/?retryWrites=true&w=majority"
  );

  if (req.method === "POST") {
    const { commentData } = req.body;
    const { email, name, text } = commentData;

    if (
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !text ||
      text.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid input." });
    }

    const newComment = {
      ...commentData,
      eventId,
    };

    const db = client.db("events");

    const result = await db.collection("comments").insertOne(newComment);

    newComment.id = result.insertedId;

    res.status(201).json({ message: "Comment added!", comment: newComment });
  }

  if (req.method === "GET") {
    const db = client.db("events");

    const documents = await db
      .collection("comments")
      .find()
      .sort({ _id: -1 })
      .toArray();

    res.status(200).json({ comments: documents });
  }

  client.close();
};

export default handler;
