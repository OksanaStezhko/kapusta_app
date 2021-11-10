const userLoginSchema = require('./userLogin')
const userRegistrySchema = require('./userRegistry')
const signValueSchema = require('./signValue')
const categorySchema = require('./category')
const transIdSchema = require('./transId')
const transactionSchema = require('./transaction')
const reportsQuerySchema = require('./reportsQuery')
const reportsByYearParamSchema = require('./reportsByYearQuery')

module.exports = {
  userLoginSchema,
  userRegistrySchema,
  signValueSchema,
  categorySchema,
  transIdSchema,
  transactionSchema,
  reportsQuerySchema,
  reportsByYearParamSchema,
}
