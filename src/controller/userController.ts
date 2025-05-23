import { type Request, type Response } from 'express';
import { drizzle } from 'drizzle-orm/mysql2'
import { hashPassword, verifyPassword } from '../helper/password';
import { error_json, generateRandomString, success_json } from '../helper/helper';
import { users } from '../db/schema';
import { emailVerifiedSuccessMessage, loginSuccessMessage, signUpSuccessMessage, verificationCodeSentInEmail } from '../helper/messages/success';
import { emailAlreadyUsedErrorMessage, emailErrorOrAlreadyVerified, emailNotVerifiedErrorMessage, emailOrPasswordErrorMessage, emailVerificaitonErrorMessage } from '../helper/messages/errors';
import { eq, and, not } from "drizzle-orm";
import { db } from '../db/db';
import { createSession } from '../utility/sessionUtility';
import send_mail from '../utility/mailUtility';



export const registerUser = async (req: Request, res: Response) => {
	const db = drizzle(process.env.DATABASE_URL as string);

	const { name, auth } = req.body;

	const password = await hashPassword(auth.password);

	const emailVerificationCode = generateRandomString(8);

	try {
		await db.insert(users).values({
			name, password, emailVerificationCode, email: auth.email
		});
	} catch (err) {
		error_json(res, emailAlreadyUsedErrorMessage)
	}

	await send_mail(auth.email, "Verification for Proshore todo app.", `<b>Thankyou for choosing proshore todo app.</b><div>You can use the link to verfify your account <a href="${process.env.WEBAPP_URL}/user/verify-email?e=${auth.email}&v=${emailVerificationCode}">Link</a> </div>`)


	if (process.env.DEV == "true") {
		success_json(res, signUpSuccessMessage, {
			code: emailVerificationCode,
			email: auth.email
		})
	}

	success_json(res, signUpSuccessMessage, {
		url: "/email-verification"
	}, "redirect");
};

export const resendVerification = async(req: Request, res: Response) => {
	const { email } = req.body;
	const emailVerificationCode = generateRandomString(8);

	const result = await db.update(users).set({
		emailVerificationCode
	}).where(and(eq(users.email, email), eq(users.emailVerified, false)));


	if (result[0].affectedRows === 0) {
		error_json(res, emailErrorOrAlreadyVerified, {})
	}

	await send_mail(email, "Verification for Proshore todo app.", `<b>Thankyou for choosing proshore todo app.</b><div>You can use the link to verfify your account <a href="${process.env.WEBAPP_URL}/user/verify-email?e=${email}&v=${emailVerificationCode}">Link</a> </div>`);

	success_json(res, verificationCodeSentInEmail, {
		url: "/login"
	}, "redirect")
}


export const verifyUserEmail = async (req: Request, res: Response) => {
	const { e, v } = req.query;

	const result = await db
	.update(users)
	.set({ emailVerified: true })
	.where(and(
		eq(users.email, e as string),
		eq(users.emailVerificationCode, v as string),  // Fixed typo
		not(eq(users.status, 'blocked'))
	));

	// Check if update was successful
	if (result[0].affectedRows === 0) {
		error_json(res, emailVerificaitonErrorMessage, {
			url: "/email-verfication-error"
		}, "redirect")
	}


	success_json(res, emailVerifiedSuccessMessage, {
		url: "/login"
	}, "redirect")
}

export const loginUser = async (req: Request, res: Response) => {
	const { email, password } = req.body;

	const result = await db.select().from(users).where(eq(users.email, email));

	if (result.length == 0) {
		error_json(res, emailOrPasswordErrorMessage)
	}

	if (!result[0].emailVerified) {
		error_json(res, emailNotVerifiedErrorMessage)
	}

	if (!await verifyPassword(result[0].password, password)) {
		error_json(res, emailOrPasswordErrorMessage)
	}


	success_json(res.setHeader("sesson", await createSession(result[0].id)), loginSuccessMessage, {}, "sesson_token");
};