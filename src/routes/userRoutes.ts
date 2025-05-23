import express from "express"
import { validateBodyData, validateHeaderData } from "../middleware/validationMiddleware"
import { userCreationValidationSchema, userLoginValidationSchema, userVerificationValidationSchema } from "../schema/userSchema"
import { loginUser, registerUser, verifyUserEmail } from "../controller/userController"

const router = express.Router()



router.get('/', (req, res) => {
  res.send('users home page')
})


router.post('/create', validateBodyData(userCreationValidationSchema), registerUser)
router.post('/login', validateBodyData(userLoginValidationSchema), loginUser)
router.get('/verify-email', validateHeaderData(userVerificationValidationSchema), verifyUserEmail)
export default router