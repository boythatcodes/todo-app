import { type Request, type Response } from 'express';
import { drizzle } from 'drizzle-orm/mysql2'
import { hashPassword, verifyPassword } from '../../utility/password';
import { error_json, generateRandomString, success_json } from '../../utility/helper';
import { users } from '../../db/schema';
import { emailVerifiedSuccessMessage, loginSuccessMessage, signUpSuccessMessage, verificationCodeSentInEmail, logoutSuccessMessage } from '../../utility/messages/success';
import { emailAlreadyUsedErrorMessage, emailErrorOrAlreadyVerified, emailNotVerifiedErrorMessage, emailOrPasswordErrorMessage, emailVerificaitonErrorMessage } from '../../utility/messages/errors';
import { eq, and, not } from "drizzle-orm";
import { db } from '../../db/db';
import { createSession } from '../../utility/sessionUtility';
import send_mail from '../../utility/mailUtility';


export const getUser = async (req: Request, res: Response) => {
	success_json(res, "", req.user);
	return;
}


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
		return;
	}

	try {
		await send_mail(auth.email, "Verification for Proshore todo app.", `<b>Thankyou for choosing proshore todo app.</b><div>You can use the link to verfify your account <a href="${process.env.WEBAPP_URL}/user/verify-email?e=${auth.email}&v=${emailVerificationCode}">${process.env.WEBAPP_URL}/user/verify-email?e=${auth.email}&v=${emailVerificationCode}</a> </div>`)
	} catch (error) {
		success_json(res, signUpSuccessMessage, {
			code: emailVerificationCode,
			email: auth.email,
			url: "/email-verification?e=" + auth.email
		}, "redirect")
		return;
	}

	if (process.env.DEV == "true") {
		success_json(res, signUpSuccessMessage, {
			code: emailVerificationCode,
			email: auth.email,
			url: "/email-verification?e=" + auth.email
		}, "redirect")
		return;
	}

	success_json(res, signUpSuccessMessage, {
		url: "/email-verification?e=" + auth.email
	}, "redirect");
	return;
};

export const resendVerification = async (req: Request, res: Response) => {
	const { email } = req.body;
	const emailVerificationCode = generateRandomString(8);

	const result = await db.update(users).set({
		emailVerificationCode
	}).where(and(eq(users.email, email), eq(users.emailVerified, false)));


	if (result[0].affectedRows === 0) {
		error_json(res, emailErrorOrAlreadyVerified, {})
		return;
	}
	try {
		await send_mail(email, "Verification for Proshore todo app.", `<b>Thankyou for choosing proshore todo app.</b><div>You can use the link to verfify your account <a href="${process.env.WEBAPP_URL}/user/verify-email?e=${email}&v=${emailVerificationCode}">${process.env.WEBAPP_URL}/user/verify-email?e=${email}&v=${emailVerificationCode}</a> </div>`);
	} catch (error) {
		success_json(res, signUpSuccessMessage, {
			code: emailVerificationCode,
			email: auth.email,
			url: "/email-verification?e=" + auth.email
		}, "redirect")
		return;
	}
	success_json(res, verificationCodeSentInEmail, {})
	return;
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
		res.redirect(`${process.env.FRONTEND_URL}/email-verfication-error?e=${users.email}`)
	}


	res.redirect(`${process.env.FRONTEND_URL}/`)
}

export const loginUser = async (req: Request, res: Response) => {
	const { email, password } = req.body;

	const result = await db.select().from(users).where(eq(users.email, email));

	if (result.length == 0) {
		error_json(res, emailOrPasswordErrorMessage)
	}

	if (!result[0].emailVerified) {
		error_json(res, emailNotVerifiedErrorMessage)
		return;
	}

	if (!await verifyPassword(result[0].password, password)) {
		error_json(res, emailOrPasswordErrorMessage)
		return;
	}


	success_json(res, loginSuccessMessage, { session: await createSession(result[0].id) }, "sesson_token");
	return;
};

