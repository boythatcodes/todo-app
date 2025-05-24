import express from "express"
import { validateBodyData, validateHeaderData } from "../middleware/validationMiddleware"
import { userCreationValidationSchema, userLoginValidationSchema, userResendEmail, userVerificationValidationSchema } from "../controller/user/userSchema"
import { getUser, loginUser, registerUser, resendVerification, verifyUserEmail } from "../controller/user/userController"
import { validateSessionMiddleware } from "../middleware/sessionValidationMiddleware"

const router = express.Router()




router.get('/', validateSessionMiddleware(), getUser);

router.post('/create', validateBodyData(userCreationValidationSchema), registerUser);
router.post('/login', validateBodyData(userLoginValidationSchema), loginUser);
router.post('/resend-link', validateBodyData(userResendEmail), resendVerification);
router.get('/verify-email', validateHeaderData(userVerificationValidationSchema), verifyUserEmail);
export default router