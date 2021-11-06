const express = require('express')
const {
  userLoginSchema,
  userRegistrySchema,
  userEmailSchema,
} = require('../../joiSchemas')
const {
  controllerWrapper,
  validation,
  authenticate,
} = require('../../middlwares')
const { users: auth } = require('../../controllers')

const router = express.Router()

router.post(
  '/signup',
  validation(userRegistrySchema),
  controllerWrapper(auth.signup)
)

router.post(
  '/verify',
  validation(userEmailSchema),
  controllerWrapper(auth.repeatVerify)
)

router.post(
  '/login',
  validation(userLoginSchema),
  controllerWrapper(auth.signin)
)

router.post('/logout', authenticate, controllerWrapper(auth.signout))

router.get('/current', authenticate, controllerWrapper(auth.currentUser))

router.patch('/balance', authenticate, controllerWrapper(auth.updateBalance))

module.exports = router
