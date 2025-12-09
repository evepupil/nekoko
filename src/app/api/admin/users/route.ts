import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser, hashPassword } from '@/lib/auth';
import { getUsers, createUser, updateUser, deleteUser, getUserByUsername, getUserByEmail } from '@/lib/store';

export async function GET() {
  const user = await getCurrentUser();
  if (!user || user.role !== 'admin') {
    return NextResponse.json({ error: '未授权' }, { status: 401 });
  }

  const users = getUsers().map(u => ({
    ...u,
    password: undefined, // 不返回密码
  }));
  return NextResponse.json(users);
}

export async function POST(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user || user.role !== 'admin') {
    return NextResponse.json({ error: '未授权' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { username, email, password, balance, role, status } = body;

    if (!username || !email || !password) {
      return NextResponse.json({ error: '请填写完整信息' }, { status: 400 });
    }

    // 检查用户名和邮箱是否已存在
    if (getUserByUsername(username)) {
      return NextResponse.json({ error: '用户名已存在' }, { status: 400 });
    }
    if (getUserByEmail(email)) {
      return NextResponse.json({ error: '邮箱已存在' }, { status: 400 });
    }

    const newUser = createUser({
      username,
      email,
      password: hashPassword(password),
      balance: balance || 0,
      role: role || 'user',
      status: status || 'active',
    });

    return NextResponse.json({ ...newUser, password: undefined });
  } catch {
    return NextResponse.json({ error: '服务器错误' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user || user.role !== 'admin') {
    return NextResponse.json({ error: '未授权' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, password, ...updates } = body;

    if (!id) {
      return NextResponse.json({ error: '缺少ID' }, { status: 400 });
    }

    // 如果有密码更新，需要哈希处理
    if (password) {
      updates.password = hashPassword(password);
    }

    const updatedUser = updateUser(id, updates);
    if (!updatedUser) {
      return NextResponse.json({ error: '用户不存在' }, { status: 404 });
    }

    return NextResponse.json({ ...updatedUser, password: undefined });
  } catch {
    return NextResponse.json({ error: '服务器错误' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user || user.role !== 'admin') {
    return NextResponse.json({ error: '未授权' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: '缺少ID' }, { status: 400 });
    }

    const success = deleteUser(id);
    if (!success) {
      return NextResponse.json({ error: '用户不存在' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: '服务器错误' }, { status: 500 });
  }
}
