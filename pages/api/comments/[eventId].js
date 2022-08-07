const handler = (req, res) => {
  const { eventId } = req.query;

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
      id: new Date().toISOString(),
      ...commentData
    };

    console.log(newComment);
    res.status(201).json({ message: "Comment added!", comment: newComment });
  }

  if (req.method === "GET") {
    const responseBody = [
      {
        id: 1,
        email: "oguzhana.tuna@gmail.com",
        name: "Oguzhan Tuna",
        text: "Tuna test",
      },
      {
        id: 2,
        email: "seda.akkaya@gmail.com",
        name: "Seda Akkaya",
        text: "Akkaya Test",
      },
    ];

    res.status(200).json({ comments: responseBody });
  }
};

export default handler;
