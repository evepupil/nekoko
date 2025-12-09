import { NextResponse } from 'next/server';
import { getActiveModels, getProviders } from '@/lib/store';

export async function GET() {
  const models = getActiveModels();
  const providers = getProviders();

  // 只返回启用的模型，并附加服务商名称
  const modelsForFrontend = models.map(model => {
    const provider = providers.find(p => p.id === model.providerId);
    return {
      id: model.id,
      name: model.name,
      type: model.type,
      pricePerCall: model.pricePerCall,
      providerName: provider?.name || '未知',
      config: model.config,
    };
  });

  return NextResponse.json(modelsForFrontend);
}
