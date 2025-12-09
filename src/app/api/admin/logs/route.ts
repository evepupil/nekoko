import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { getCallLogs, getUsers, getModels } from '@/lib/store';

export async function GET() {
  const user = await getCurrentUser();
  if (!user || user.role !== 'admin') {
    return NextResponse.json({ error: '未授权' }, { status: 401 });
  }

  const logs = getCallLogs(100); // 最近100条
  const users = getUsers();
  const models = getModels();

  // 附加用户名和模型名
  const logsWithDetails = logs.map(log => {
    const logUser = users.find(u => u.id === log.userId);
    const model = models.find(m => m.id === log.modelId);
    return {
      ...log,
      username: logUser?.username || '未知用户',
      modelName: model?.name || '未知模型',
    };
  });

  return NextResponse.json(logsWithDetails);
}
