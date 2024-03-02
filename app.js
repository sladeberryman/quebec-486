require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 5500;
const { MongoClient, ServerApiVersion } = require('mongodb');
const bodyParser = require('body-parser')
// set the view engine to ejs
let path = require('path');

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'))
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({ extended: true }))

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(process.env.MONGO_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function getNameData() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    const result = await client.db("quebec-database").collection("quebec-collection").find().toArray();
    console.log("mongo call await inside f/n: ", result);
    return result; 
  } 
  catch(err) {
    console.log("getName() error: ", err);
  }
  finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
}

//reading from mongo
app.get('/', async (req, res) =>  {

  let result = await getNameData().catch(console.error); ; 

  console.log("getNameData() Result: ", result);

  res.render('index', {
   
    pageTitle: "Name Game", 
    jobData: result 

  });
  
});

//create to mongo 
app.post('/addName', async (req, res) => {

  try {
    client.connect; 
    const collection = client.db("quebec-database").collection("quebec-collection");
    
    //draws from body parser 
    console.log(req.body);
    
    await collection.insertOne(req.body);
      

    res.redirect('/');
  }
  catch(err){
    console.log(err)
  }
  finally{
   // client.close()
  }

})

// update in Mongo
app.post('/updateName/:id', async (req, res) => {

  try {
    console.log("req.parms.id: ", req.params.id) 
    
    client.connect; 
    const collection = client.db("quebec-database").collection("quebec-collection");
    let result = await collection.findOneAndUpdate( 
      {"_id": ObjectId(req.params.id)}, { $set: {"age": "Old" } }
    )
    .then(result => {
      console.log(result); 
      res.redirect('/');
    })
    .catch(error => console.error(error))
  }
  finally{
    //client.close()
  }

})

// delete in Mongo
app.post('/deleteName/:id', async (req, res) => {

  try {
    console.log("req.parms.id: ", req.params.id) 
    
    client.connect; 
    const collection = client.db("quebec-database").collection("quebec-collection");
    let result = await collection.findOneAndDelete( 
      {
        "_id": ObjectId(req.params.id)
      }
    )
    .then(result => {
      console.log(result); 
      res.redirect('/');
    })
    .catch(error => console.error(error))
  }
  finally{
    //client.close()
  }

})

app.get('/name', (req,res) => {

  console.log("in get to slash name:", req.query.ejsFormName); 
  myTypeServer = req.query.ejsFormName; 

  res.render('index', {
    myTypeClient: myTypeServer,
    myResultClient: "myResultServer"

  });

  
})


app.listen(port, () => {
console.log(`QUEBEC app listening on port ${port}`)
})