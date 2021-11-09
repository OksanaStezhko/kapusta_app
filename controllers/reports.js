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

const groupByCategory = async (req, res) => {
  const { month, year, sign } = req.query
  const searchResult = await Transaction.find(
    { year, month },
    '_id description category value'
  ).populate('category')

  const filterdResult = sign
    ? searchResult.filter((trans) => trans.category.sign === sign)
    : searchResult

  const result = filterdResult.reduce(
    (
      acc,
      { category: { _id: categoryId, name: categoryName }, description, value }
    ) => {
      const findCategory = acc.find((item) => item.categoryId === categoryId)

      if (findCategory) {
        findCategory.value = findCategory.value + value
        const findSubCategory = findCategory.subCategories.find(
          (des) => des.name === description
        )
        if (findSubCategory) {
          findSubCategory.value = findSubCategory.value + value
        } else {
          findCategory.subCategories.push({ name: description, value })
        }

        return [...acc]
      }
      return [
        ...acc,
        {
          categoryId,
          categoryName,
          value,
          subCategories: [{ name: description, value }],
        },
      ]
    },
    []
  )

  sendSuccess.reports(
    res,
    result,
    'Reports of the detals with grouping by categories and descriptions'
  )
}

module.exports = { detalsTransactions, groupByCategory }
