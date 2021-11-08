const Joi = require('joi')
const {
  constants: { signValue },
} = require('../utils')

const reportsParamSchema = Joi.object({
  signValue: Joi.any().valid(...signValue),
  year: Joi.number().min(1900).max(2050),
  month: Joi.number().min(0).max(11),
})

module.exports = reportsParamSchema
