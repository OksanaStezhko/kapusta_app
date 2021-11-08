const { Transaction } = require('../model')
const { sendSuccess } = require('../utils')

const detalsTransactions = async (req, res) => {
  const { month, year, signValue } = req.params
  const searchResult = await Transaction.find(
    { year, month },
    '_id date year month description category value'
  ).populate('category')
  let result = []
  if (signValue) {
    result = searchResult.filter((trans) => trans.category.sign === signValue)
  } else result = searchResult

  sendSuccess.reports(res, result, 'Reports of the detals')
}

module.exports = { detalsTransactions }
