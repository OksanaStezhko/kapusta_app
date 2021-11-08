const express = require('express')
const {
  authenticate,
  controllerWrapper,
  validationParam,
} = require('../../middlwares')
const { reports: reportsController } = require('../../controllers')
const { reportsParamSchema } = require('../../joiSchemas')
const router = express.Router()
router.use(authenticate)

router.get(
  '/detals/:year/:month/:signValue?',
  validationParam(reportsParamSchema),
  controllerWrapper(reportsController.detalsTransactions)
)

module.exports = router
