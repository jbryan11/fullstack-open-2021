var express = require('express')
var router = express.Router()
const Person = require('../models/mongo')

function errorFound(name, number) {
  if (fieldIsEmpty(name, number)) return 'Please enter your name and number.'
  // if (nameIsExisting(name)) return "Name already exist.";
  return 0
}
function fieldIsEmpty(name, number) {
  return name && number ? false : true
}
/* GET users listing. */
router.get('/persons', (req, res) => {
  Person.find({}).then((result) => {
    res.json(result)
  })
})
router.post('/persons', (req, res, next) => {
  const entry = req.body
  let hasError = errorFound(entry.name, entry.number)
  if (hasError) {
    return res.status(400).json({ error: hasError })
  }
  const newPerson = new Person({
    name: entry.name,
    number: entry.number,
  })
  newPerson
    .save()
    .then((saved) => {
      saved ? res.json(saved) : res.status(404).end()
    })
    .catch((err) => {
      next(err)
    })
})
router.get('/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then((foundOne) => {
      foundOne ? res.json(foundOne) : res.status(404).end()
    })
    .catch((err) => {
      next(err)
    })
})
router.delete('/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).end()
    })
    .catch((err) => {
      next(err)
    })
})
router.put('/persons/:id', (req, res, next) => {
  const data = req.body
  console.log(data)
  const person = {
    name: data.name,
    number: data.number,
  }
  Person.findByIdAndUpdate(req.params.id, person, { new: true, runValidators: true })
    .then((updatedAccount) => {
      res.status(200).json(updatedAccount)
    })
    .catch((err) => next(err))
})

module.exports = router
