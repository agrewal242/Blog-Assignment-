const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid'); // Using v4 to generate UUIDs
const { MongoClient } = require('mongodb');

const app = express();
const port = 3000;
const mongoURI = "mongodb://localhost:27017";

let db;
let collection;

MongoClient.connect(mongoURI)
  .then((client) => {
    db = client.db("posts");
    collection = db.collection("posts");
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.error(err));

app.use(express.json());
app.use(cors());

// GET route: Retrieve posts. If a query parameter id is provided, send only that post.
app.get("/manage_posts", async (req, res) => {
  if (req.query.id) {
    const post = await collection.findOne({ _id: req.query.id });
    res.send(post);
  } else {
    const posts = await collection.find().toArray();
    res.send(posts);
  }
});

// POST route: Add a new post.
app.post("/manage_posts", async (req, res) => {
  await collection.insertOne({
    _id: uuidv4(),
    ...req.body  // Spread the rest of the keys from the request body
  });
  const currPosts = await collection.find().toArray();
  console.log("Added", currPosts);
  res.send(currPosts);
});

// DELETE route: Delete a post by id.
app.delete("/manage_posts", async (req, res) => {
 const delPost =  await collection.deleteOne({ _id: req.query.id });
  const currPosts = await collection.find().toArray();
  console.log("Deleted", currPosts);
  res.send(currPosts);
});

// PUT route: Update a post by id.
app.put("/manage_posts", async (req, res) => {
  const updatedPost = await collection.updateOne(
    { _id: req.query.id },
    { $set: req.body }
  );
  const currPosts = await collection.find().toArray();
  console.log("Updated", currPosts);
  res.send(currPosts);
});

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
