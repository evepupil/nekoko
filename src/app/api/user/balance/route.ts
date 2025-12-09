import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';
import { getUserById, updateUser, createCallLog } from '@/lib/store';

// GET - 获取用户余额
export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get('user-token')?.value;
  if (!token) {
    return NextResponse.json({ error: '未登录' }, { status: 401 });
  }

  const payload = await verifyToken(token);
  if (!payload || !payload.userId) {
    return NextResponse.json({ error: '无效的登录状态' }, { status: 401 });
  }

  const user = getUserById(payload.userId);
  if (!user) {
    return NextResponse.json({ error: '用户不存在' }, { status: 404 });
  }

  return NextResponse.json({ balance: user.balance });
}

// POST - 扣除余额（生成图片时调用）
export async function POST(request: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get('user-token')?.value;
  if (!token) {
    return NextResponse.json({ error: '未登录' }, { status: 401 });
  }

  const payload = await verifyToken(token);
  if (!payload || !payload.userId) {
    return NextResponse.json({ error: '无效的登录状态' }, { status: 401 });
  }

  const user = getUserById(payload.userId);
  if (!user) {
    return NextResponse.json({ error: '用户不存在' }, { status: 404 });
  }

  const body = await request.json();
  const { amount, modelId, prompt } = body;

  if (!amount || amount <= 0) {
    return NextResponse.json({ error: '无效的扣除金额' }, { status: 400 });
  }

  if (user.balance < amount) {
    return NextResponse.json({ error: '余额不足' }, { status: 400 });
  }

  // 扣除余额
  const newBalance = user.balance - amount;
  updateUser(user.id, { balance: newBalance });

  // 记录调用日志
  createCallLog({
    userId: user.id,
    modelId: modelId || 'unknown',
    prompt: prompt || '',
    status: 'success',
    cost: amount,
    responseTime: 0,
  });

  return NextResponse.json({
    success: true,
    balance: newBalance,
    deducted: amount
  });
}
