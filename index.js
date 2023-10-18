const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

// MIDDLEWARE
app.use(cors());
app.use(express.json());

app.get("/", (req, res)=>{
    res.send("Foodie Delight server is running")
})
app.listen(port, ()=>{
    console.log(`Foodie Delight server is running on port :${port}`)
})
