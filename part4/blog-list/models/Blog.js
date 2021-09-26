const mongoose = require('mongoose');
const {MONGODB_URI} = require('../utils/global-vars');
const schemaBlog = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
})
console.log('Plugging the connection to ', MONGODB_URI)

schemaBlog.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('Plugged successfully!')
  })
  .catch((err) => {
    console.log(
      'It cant fit into the socket,something is wrong : ',
      err.message
    )
  })

module.exports = mongoose.model('Blogs', schemaBlog)

