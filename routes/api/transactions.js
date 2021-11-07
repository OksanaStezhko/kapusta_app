const express = require('express')
const { authenticate, controllerWrapper } = require('../../middlwares')
const { transactions: transactionsController } = require('../../controllers')
const router = express.Router()
router.use(authenticate)

router.post('/expenses', controllerWrapper(transactionsController.addExpenses))
router.post('/incomes', controllerWrapper(transactionsController.addIncomes))
router.delete(
  '/:transId',
  controllerWrapper(transactionsController.deleteTransactionById)
)

module.exports = router
