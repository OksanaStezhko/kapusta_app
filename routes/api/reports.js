const express = require('express')
const {
  authenticate,
  controllerWrapper,
  validationQuery,
} = require('../../middlwares')
const { reports: reportsController } = require('../../controllers')
const { reportsQuerySchema } = require('../../joiSchemas')
const router = express.Router()
router.use(authenticate)

router.get(
  '/detals',
  validationQuery(reportsQuerySchema),
  controllerWrapper(reportsController.detalsTransactions)
)

module.exports = router
