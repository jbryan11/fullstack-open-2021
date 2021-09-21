const mongoose = require("mongoose");

const url = process.env.MONGODB_URI

console.log('Plugging the connection to ', url);

mongoose.connect(url).then((result) => {
    console.log('Plugged successfully!');
}).catch((err) => {
    console.log('It cant fit into the socket,something is wrong : ', err.message);
});;

const schemaPerson = new mongoose.Schema({
	name: String,
	number: String,
}); 
schemaPerson.set('toJSON',{
    transform:(document,returnedObject)=> {
     returnedObject.id = returnedObject._id.toString()
     delete returnedObject._id
     delete returnedObject.__v
    }
})
module.exports = mongoose.model("Person", schemaPerson);


