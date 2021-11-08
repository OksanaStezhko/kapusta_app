const { NotFound, BadRequest } = require('http-errors')
const { Transaction, User, Category } = require('../model')
const { sendSuccess } = require('../utils')
const { signValue } = require('../utils/constants')

const detalsTransactions = async (req, res) => {
  const { month, year, signValue } = req.params
  const searchResult = await Transaction.find(
    { year, month },
    '_id date year month description category value'
  ).populate('category')

  if (signValue) {
    result = searchResult.filter((trans) => trans.category.sign === signValue)
  } else result = searchResult

  sendSuccess.reports(res, result, 'Reports of the detals')
}

module.exports = { detalsTransactions }
