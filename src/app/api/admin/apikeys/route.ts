import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { getApiKeys, createApiKey, updateApiKey, deleteApiKey, getUsers } from '@/lib/store';

export async function GET() {
  const user = await getCurrentUser();
  if (!user || user.role !== 'admin') {
    return NextResponse.json({ error: '未授权' }, { status: 401 });
  }

  const apiKeys = getApiKeys();
  const users = getUsers();

  // 附加用户名
  const keysWithUser = apiKeys.map(key => {
    const keyUser = users.find(u => u.id === key.userId);
    return {
      ...key,
      username: keyUser?.username || '未知用户',
    };
  });

  return NextResponse.json(keysWithUser);
}

export async function POST(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user || user.role !== 'admin') {
    return NextResponse.json({ error: '未授权' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { userId, name } = body;

    if (!userId || !name) {
      return NextResponse.json({ error: '请填写完整信息' }, { status: 400 });
    }

    const apiKey = createApiKey({
      userId,
      name,
      status: 'active',
    });

    return NextResponse.json(apiKey);
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
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ error: '缺少ID' }, { status: 400 });
    }

    const apiKey = updateApiKey(id, updates);
    if (!apiKey) {
      return NextResponse.json({ error: 'API Key不存在' }, { status: 404 });
    }

    return NextResponse.json(apiKey);
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

    const success = deleteApiKey(id);
    if (!success) {
      return NextResponse.json({ error: 'API Key不存在' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: '服务器错误' }, { status: 500 });
  }
}
