const users = (res, user, status = 200) => {
  res.status(status).json({
    user,
  })
}
// сделала отдельные ответы для разных роутов,
// но если различий не будет, можно объединить
const categories = (res, results, message = '', status = 200) => {
  res.status(status).json({
    message: `${status}OK.` + message,
    results,
  })
}

const transactions = (res, results, message = '', status = 200) => {
  res.status(status).json({
    message: `${status}OK.` + message,
    results,
  })
}

const reports = (res, results, message = '', status = 200) => {
  res.status(status).json({
    message: `${status}OK.` + message,
    results,
  })
}

module.exports = { users, categories, transactions, reports }
