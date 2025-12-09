import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';
import { getUserById, updateUser, createCallLog, getActiveModels, getModelById, getProviderById } from '@/lib/store';

export async function POST(request: NextRequest) {
  try {
    // 验证用户登录
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

    // 解析请求
    const body = await request.json();
    const { prompt, modelId, width = 1024, height = 1024 } = body;

    if (!prompt || !prompt.trim()) {
      return NextResponse.json({ error: '请输入提示词' }, { status: 400 });
    }

    // 获取模型
    let model;
    if (modelId) {
      model = getModelById(modelId);
    } else {
      const models = getActiveModels();
      model = models[0];
    }

    if (!model) {
      return NextResponse.json({ error: '暂无可用的生成模型，请联系管理员配置' }, { status: 400 });
    }

    // 获取服务商
    const provider = getProviderById(model.providerId);
    if (!provider || provider.status !== 'active') {
      return NextResponse.json({ error: '服务商不可用' }, { status: 400 });
    }

    // 检查余额
    const cost = model.pricePerCall || 0.5;
    if (user.balance < cost) {
      return NextResponse.json({ error: '余额不足，请先充值' }, { status: 400 });
    }

    const startTime = Date.now();

    // 调用上游 API 生成图片
    const apiUrl = `${provider.baseUrl}/images/generations`;

    const apiResponse = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${provider.apiKey}`,
      },
      body: JSON.stringify({
        prompt: prompt.trim(),
        model: model.modelId,
        size: `${width}x${height}`,
        n: 1,
      }),
    });

    const responseTime = Date.now() - startTime;

    if (!apiResponse.ok) {
      const errorData = await apiResponse.json().catch(() => ({}));
      console.error('API Error:', errorData);

      // 记录失败日志（不扣费）
      createCallLog({
        userId: user.id,
        modelId: model.id,
        prompt: prompt.trim(),
        status: 'failed',
        cost: 0,
        responseTime,
      });

      return NextResponse.json({
        error: errorData.error?.message || '图片生成失败，请稍后重试'
      }, { status: 500 });
    }

    const result = await apiResponse.json();

    // 获取图片 URL
    const imageUrl = result.data?.[0]?.url || result.data?.[0]?.b64_json;

    if (!imageUrl) {
      return NextResponse.json({ error: '未能获取生成的图片' }, { status: 500 });
    }

    // 扣除余额
    const newBalance = user.balance - cost;
    updateUser(user.id, { balance: newBalance });

    // 记录成功日志
    createCallLog({
      userId: user.id,
      modelId: model.id,
      prompt: prompt.trim(),
      status: 'success',
      cost,
      responseTime,
    });

    return NextResponse.json({
      success: true,
      imageUrl: result.data?.[0]?.url || null,
      imageBase64: result.data?.[0]?.b64_json || null,
      cost,
      balance: newBalance,
      model: model.name,
    });

  } catch (error) {
    console.error('Generate error:', error);
    return NextResponse.json({
      error: error instanceof Error ? error.message : '服务器错误'
    }, { status: 500 });
  }
}
