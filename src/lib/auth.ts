import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';
import { getUserByUsername, getSettings } from './store';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'nekoko-secret-key-change-in-production'
);

export interface JWTPayload {
  userId?: string;
  username: string;
  role: 'admin' | 'user';
  exp?: number;
}

// 创建JWT
export async function createToken(payload: Omit<JWTPayload, 'exp'>): Promise<string> {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('7d')
    .sign(JWT_SECRET);
}

// 验证JWT
export async function verifyToken(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as unknown as JWTPayload;
  } catch {
    return null;
  }
}

// 获取当前用户
export async function getCurrentUser(): Promise<JWTPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth-token')?.value;
  if (!token) return null;
  return await verifyToken(token);
}

// 管理员登录
export async function adminLogin(username: string, password: string): Promise<string | null> {
  // 检查是否是超级管理员
  if (username === 'admin') {
    const settings = getSettings();
    const isValid = bcrypt.compareSync(password, settings.adminPassword);
    if (isValid) {
      return await createToken({ username: 'admin', role: 'admin' });
    }
  }

  // 检查普通管理员用户
  const user = getUserByUsername(username);
  if (user && user.role === 'admin' && user.status === 'active') {
    const isValid = bcrypt.compareSync(password, user.password);
    if (isValid) {
      return await createToken({ userId: user.id, username: user.username, role: 'admin' });
    }
  }

  return null;
}

// 用户登录
export async function userLogin(username: string, password: string): Promise<string | null> {
  const user = getUserByUsername(username);
  if (user && user.status === 'active') {
    const isValid = bcrypt.compareSync(password, user.password);
    if (isValid) {
      return await createToken({ userId: user.id, username: user.username, role: user.role });
    }
  }
  return null;
}

// 哈希密码
export function hashPassword(password: string): string {
  return bcrypt.hashSync(password, 10);
}

// 验证密码
export function verifyPassword(password: string, hash: string): boolean {
  return bcrypt.compareSync(password, hash);
}
