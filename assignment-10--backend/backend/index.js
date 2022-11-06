const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const jwt = require("jsonwebtoken");

// initialize express cors and port
const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.nxpijbg.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

//middleware

function verifyJwtToken(req, res, next) {
  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(401).send({
      message: "unauthorize access",
    });
  }

  jwt.verify(token, process.env.JSON_SECRET, (err, decode) => {
    if (err) {
      return res.status(403).send({ message: "forbidden access" });
    }

    req.userEmail = decode.email;

    next();
  });
}

// route create

app.get("/", (req, res) => {
  res.send({ name: "hello world" });
});

// get all course rout
async function run() {
  const database = client.db("ema-john").collection("products");
  // const ordersCollection = client.db("ema-john").collection("orders");

  try {
    app.post("/jwtgenerate", (req, res) => {
      const userData = req.body;

      const token = jwt.sign(userData, process.env.JSON_SECRET, {
        expiresIn: "1h",
      });

      res.send({
        token,
      });
    });

    app.get("/products", async (req, res) => {
      const { category, limit, currentPage } = req.query;

      let query;
      if (category === "all" || category === "") {
        query = {};
      } else {
        query = { category: category };
      }

      const skip = currentPage * limit;

      const cursor = database.find(query);
      const totalCount = await cursor.count();

      const products = await cursor
        .skip(parseInt(skip))
        .limit(parseInt(limit))
        .toArray();

      res.send({
        products,
        totalCount,
      });
    });

    // get all cart products

    app.post("/productByIds", verifyJwtToken, async (req, res) => {
      const ids = req.body;
      if(!ids?.length > 0) return
      const objectConvertedId = ids.map((id) => ObjectId(id));
      const query = {
        _id: { $in: objectConvertedId },
      };
      const cursor = database.find(query);
      const products = await cursor.toArray();
      res.send({
        products,
      });
    });

    // single product

    app.get("/product/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const product = await database.findOne(query);
      res.send({
        product,
      });
    });

  } finally {
  }
}
run().catch((err) => {
  console.log(err);
});

// server start

app.listen(PORT, () => {
  console.log(`listen on port${PORT}`);
});
