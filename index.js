const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

// MIDDLEWARE
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ygdvtxa.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    // const userCollection = client.db('userDB').collection('user');

    // // ::: ADDING USER IN SERVER SITE :::
    // app.post('/users', async(req, res)=>{
    //     const newUser = req.body;
    //     console.log('new user:', newUser);
    //     const result = await usersCollection.insertOne(newUser);
    //     res.send(result);
        
    // })


    // :::: ADDING PRODUCT AND GETTING PRODUCTS :::: 

    const productCollection = client.db('productDB').collection('product');
    // ::: GETTING PRODUCTS :::
    app.get('/product', async(req, res)=>{
        const cursor = productCollection.find();
        const result = await cursor.toArray();
        res.send(result);
    })

    // ::: ADDING PRODUCT IN SERVER SITE :::
    app.post('/product', async(req, res)=>{
        const newProduct = req.body;
        console.log(newProduct);
        const result = await productCollection.insertOne(newProduct)
        res.send(result)
    })

    // ::: ADDING MY CART PRODUCT AND GET PRODUCT :::

    const myCartCollection = client.db('myCartDB').collection('myCart')
    // GETTING CART PRODUCT :::
    app.get('/myCart', async(req, res)=>{
        const cursor = myCartCollection.find();
        const result = await cursor.toArray();
        res.send(result);
    })
    // ::: ADDING CART PRODUCT IN SERVER SITE :::
    app.post('/myCart', async(req, res)=>{
        const newCartProduct = req.body;
        console.log(newCartProduct);
        const result = await myCartCollection.insertOne(newCartProduct)
    })









    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get("/", (req, res)=>{
    res.send("Foodie Delight server is running")
})
app.listen(port, ()=>{
    console.log(`Foodie Delight server is running on port :${port}`)
})
