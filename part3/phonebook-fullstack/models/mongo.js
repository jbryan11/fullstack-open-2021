const mongoose = require('mongoose')
const uniqeValidator = require('mongoose-unique-validator')
// eslint-disable-next-line no-undef
const url = process.env.MONGODB_URI

console.log('Plugging the connection to ', url)

mongoose
  .connect(url)
  .then(() => {
    console.log('Plugged successfully!')
  })
  .catch((err) => {
    console.log(
      'It cant fit into the socket,something is wrong : ',
      err.message
    )
  })

const schemaPerson = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    minLength: 3,
    required: true
  },
  number: {
    type: String,
    minLength: 8,
    required: true
  },
})

schemaPerson.plugin(uniqeValidator)
schemaPerson.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})
module.exports = mongoose.model('Person', schemaPerson)
