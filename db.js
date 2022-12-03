const { MongoClient } = require("mongodb");
const ObjectId = require("mongodb").ObjectId;

const uri = `mongodb+srv://mydbuser1:database@cluster0.xztta.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
   useNewUrlParser: true,
   useUnifiedTopology: true,
});

console.log(uri);
let mongodb;
let mongodb1;

function connect(callback) {
   client.connect();
   fixtures = client.db("fixtures");
   console.log("Connected to MongoDB");
   callback();
}
function get() {
   return { fixtures };
}

function close() {
   // mongodb.close();
}

module.exports = {
   connect,
   get,
};
