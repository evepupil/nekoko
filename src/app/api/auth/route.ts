import { NextRequest, NextResponse } from 'next/server';
import { userLogin, createToken, hashPassword } from '@/lib/auth';
import { createUser, getUserByUsername, getUserByEmail, getSettings } from '@/lib/store';

// 用户登录
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, username, email, password } = body;

    if (action === 'register') {
      // 注册
      const settings = getSettings();
      if (!settings.allowRegistration) {
        return NextResponse.json({ error: '暂不开放注册' }, { status: 400 });
      }

      if (!username || !email || !password) {
        return NextResponse.json({ error: '请填写完整信息' }, { status: 400 });
      }

      if (getUserByUsername(username)) {
        return NextResponse.json({ error: '用户名已存在' }, { status: 400 });
      }

      if (getUserByEmail(email)) {
        return NextResponse.json({ error: '邮箱已存在' }, { status: 400 });
      }

      const user = createUser({
        username,
        email,
        password: hashPassword(password),
        balance: settings.defaultUserBalance,
        role: 'user',
        status: 'active',
      });

      const token = await createToken({
        userId: user.id,
        username: user.username,
        role: user.role,
      });

      const response = NextResponse.json({ success: true });
      response.cookies.set('user-token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7,
      });

      return response;
    } else {
      // 登录
      if (!username || !password) {
        return NextResponse.json({ error: '请输入用户名和密码' }, { status: 400 });
      }

      const token = await userLogin(username, password);
      if (!token) {
        return NextResponse.json({ error: '用户名或密码错误' }, { status: 401 });
      }

      const response = NextResponse.json({ success: true });
      response.cookies.set('user-token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7,
      });

      return response;
    }
  } catch {
    return NextResponse.json({ error: '服务器错误' }, { status: 500 });
  }
}
