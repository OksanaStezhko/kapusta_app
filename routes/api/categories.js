const express = require('express')
const { signValueSchema, categorySchema } = require('../../joiSchemas')
const {
  controllerWrapper,
  validationParam,
  validation,
  authenticate,
} = require('../../middlwares')
const { categories: categoriesController } = require('../../controllers')

const router = express.Router()

router.use(authenticate)

router.get(
  '/:signValue',
  validationParam(signValueSchema),
  controllerWrapper(categoriesController.getCategoriesBySign)
)

router.get('/', controllerWrapper(categoriesController.getAllCategories))

router.post(
  '/',
  validation(categorySchema),
  controllerWrapper(categoriesController.addCategory)
)

module.exports = router
