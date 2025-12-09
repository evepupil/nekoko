import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser, hashPassword } from '@/lib/auth';
import { getSettings, updateSettings } from '@/lib/store';

export async function GET() {
  const user = await getCurrentUser();
  if (!user || user.role !== 'admin') {
    return NextResponse.json({ error: '未授权' }, { status: 401 });
  }

  const settings = getSettings();
  return NextResponse.json({
    ...settings,
    adminPassword: undefined, // 不返回密码
  });
}

export async function PUT(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user || user.role !== 'admin') {
    return NextResponse.json({ error: '未授权' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { adminPassword, ...updates } = body;

    // 如果有密码更新，需要哈希处理
    if (adminPassword) {
      updates.adminPassword = hashPassword(adminPassword);
    }

    const settings = updateSettings(updates);
    return NextResponse.json({
      ...settings,
      adminPassword: undefined,
    });
  } catch {
    return NextResponse.json({ error: '服务器错误' }, { status: 500 });
  }
}
