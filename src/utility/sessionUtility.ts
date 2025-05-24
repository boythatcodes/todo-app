import { sessions, users } from '../db/schema';
import { randomBytes } from 'crypto';
import { eq } from "drizzle-orm";
import { generateRandomString } from '../utility/helper';
import { db } from '../db/db';


export async function createSession(userId: number) {
    const sessionToken = randomBytes(64).toString('hex');
    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 1 week

    await db.insert(sessions).values({
        id: generateRandomString(10),
        userId,
        sessionToken,
        expires,
    });

    return sessionToken;
}

export async function validateSession(token: string) {

    const session = await db
        .select()
        .from(sessions)
        .where(eq(sessions.sessionToken, token))
        .leftJoin(users, eq(sessions.userId, users.id))
        .then(res => res[0]);

    if (!session || !session.sessions || !session.users) return null;

    if (new Date(session.sessions.expires) < new Date()) {
        await db.delete(sessions).where(eq(sessions.id, session.sessions.id));
        return null;
    }

    return {
        id: session.users.id,
        name: session.users.name,
        email: session.users.email,
        emailVerified: session.users.emailVerified,
        status: session.users.status,
    };
}

export async function deleteSession(token: string) {
    await db.delete(sessions).where(eq(sessions.sessionToken, token));
}