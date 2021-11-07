const { NotFound, BadRequest } = require('http-errors')
const { Transaction, User, Category } = require('../model')
const { sendSuccess } = require('../utils')

const checkBalance = ({ user: { balance }, body: { value } }) => {
  const newBalance = balance - value
  if (newBalance < 0) {
    return false
  }
  return true
}

const defineSignCategory = async (idCategory) => {
  const categoryTrans = await Category.findById(idCategory, '_id sign')
  return categoryTrans.sign
}

const updateBalanceAfterAddTrans = async ({
  user: { _id, balance },
  body: { value, category },
}) => {
  const signCategory = await defineSignCategory(category)

  if (signCategory === 'expenses') {
    newBalance = balance - value
  } else {
    newBalance = balance + value
  }
  await User.findByIdAndUpdate(_id, { balance: newBalance })
}

const updateBalanceAfterDeleteTrans = async (
  { user: { _id, balance } },
  { category, value }
) => {
  const signCategory = await defineSignCategory(category)

  if (signCategory === 'expenses') {
    newBalance = balance + value
  } else {
    newBalance = balance - value
  }
  await User.findByIdAndUpdate(_id, { balance: newBalance })
}

const addExpenses = async (req, res) => {
  if (!checkBalance(req)) {
    throw new BadRequest('Not enough funds for this operation')
  }

  const newTrans = { ...req.body, owner: req.user._id }
  const result = await Transaction.create(newTrans)
  result.setDetalsDate()
  await result.save()
  await updateBalanceAfterAddTrans(req)
  sendSuccess.transactions(res, result, 'Expenses added!', 201)
}

const addIncomes = async (req, res) => {
  const newTrans = { ...req.body, owner: req.user._id }
  const result = await Transaction.create(newTrans)
  result.setDetalsDate()
  await result.save()
  await updateBalanceAfterAddTrans(req)
  sendSuccess.transactions(res, result, 'Incomes added!', 201)
}

const deleteTransactionById = async (req, res) => {
  const { transId } = req.params
  const { _id: userId } = req.user
  const result = await Transaction.findOneAndRemove({
    _id: transId,
    owner: userId,
  })
  if (!result) {
    throw new NotFound(
      `Transaction with id=${transId} of user with id=${userId} not found!`
    )
  }

  await updateBalanceAfterDeleteTrans(req, result)

  sendSuccess.transactions(
    res,
    result,
    `Transaction with id=${transId} deleted!`
  )
}

module.exports = { addExpenses, addIncomes, deleteTransactionById }
