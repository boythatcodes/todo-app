import express from "express"
import { validateBodyData, validateQueryData } from "../middleware/validationMiddleware"
import { userCreationValidationSchema, userLoginValidationSchema, userResendEmail, userVerificationValidationSchema } from "../feature/user/userSchema"
import { getUser, loginUser, registerUser, resendVerification, verifyUserEmail } from "../feature/user/userController"
import { validateSessionMiddleware } from "../middleware/sessionValidationMiddleware"

const router = express.Router()




router.get('/', validateSessionMiddleware(), getUser);

router.post('/create', validateBodyData(userCreationValidationSchema), registerUser);
router.post('/login', validateBodyData(userLoginValidationSchema), loginUser);
router.post('/resend-link', validateBodyData(userResendEmail), resendVerification);
router.get('/verify-email', validateQueryData(userVerificationValidationSchema), verifyUserEmail);
export default router