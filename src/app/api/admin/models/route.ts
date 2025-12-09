import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { getModels, createModel, updateModel, deleteModel, getProviders } from '@/lib/store';

export async function GET() {
  const user = await getCurrentUser();
  if (!user || user.role !== 'admin') {
    return NextResponse.json({ error: '未授权' }, { status: 401 });
  }

  const models = getModels();
  const providers = getProviders();

  // 附加服务商名称
  const modelsWithProvider = models.map(model => {
    const provider = providers.find(p => p.id === model.providerId);
    return {
      ...model,
      providerName: provider?.name || '未知',
    };
  });

  return NextResponse.json(modelsWithProvider);
}

export async function POST(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user || user.role !== 'admin') {
    return NextResponse.json({ error: '未授权' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { name, modelId, providerId, type, pricePerCall, config } = body;

    if (!name || !modelId || !providerId || !type) {
      return NextResponse.json({ error: '请填写完整信息' }, { status: 400 });
    }

    const model = createModel({
      name,
      modelId,
      providerId,
      type,
      pricePerCall: pricePerCall || 0,
      status: 'active',
      config: config || {},
    });

    return NextResponse.json(model);
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

    const model = updateModel(id, updates);
    if (!model) {
      return NextResponse.json({ error: '模型不存在' }, { status: 404 });
    }

    return NextResponse.json(model);
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

    const success = deleteModel(id);
    if (!success) {
      return NextResponse.json({ error: '模型不存在' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: '服务器错误' }, { status: 500 });
  }
}
