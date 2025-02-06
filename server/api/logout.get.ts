import { defineEventHandler, deleteCookie, getCookie } from '#imports'
import { eq } from 'drizzle-orm';
import { db } from '../database/db';
import { sessions } from '../database/schema';

export default defineEventHandler(async (event) => {
  const sessionId = getCookie(event, 'session_id');
  
  if (!sessionId) return ({statusCode: 400});

  await db.delete(sessions).where(eq(sessions.id, sessionId));

  deleteCookie(event, 'session_id');
  
  return ({
    statusCode: 200
  });
});