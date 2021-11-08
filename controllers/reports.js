const { Transaction } = require('../model')
const { sendSuccess } = require('../utils')

const detalsTransactions = async (req, res) => {
  const { month, year, sign } = req.query
  const searchResult = await Transaction.find(
    { year, month },
    '_id date year month description category value'
  ).populate('category')
  let result = []
  if (sign) {
    result = searchResult.filter((trans) => trans.category.sign === sign)
  } else result = searchResult

  sendSuccess.reports(res, result, 'Reports of the detals')
}

module.exports = { detalsTransactions }
