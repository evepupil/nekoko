import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';
import { getUserById, getCallLogsByUserId, getModelById } from '@/lib/store';

// GET - 获取用户的调用日志
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

  const logs = getCallLogsByUserId(payload.userId);

  // 添加模型名称
  const logsWithModel = logs.map(log => {
    const model = getModelById(log.modelId);
    return {
      ...log,
      modelName: model?.name || '未知模型'
    };
  });

  return NextResponse.json(logsWithModel);
}
