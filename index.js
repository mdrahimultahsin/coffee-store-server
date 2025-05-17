const express = require("express");
const cors = require("cors");
const {MongoClient, ServerApiVersion} = require("mongodb");
require('dotenv').config()
const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());



const uri =
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.3sx3amx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();

    // Insert/Add Data into DB
    const coffeeCollection = client.db("coffeeDB").collection("coffees")

    await client.db("admin").command({ping: 1});
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("server is running");
});
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
