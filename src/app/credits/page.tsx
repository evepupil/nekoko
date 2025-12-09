'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/components/AuthProvider';
import Link from 'next/link';

interface UsageLog {
  id: string;
  modelName: string;
  prompt: string;
  cost: number;
  status: string;
  createdAt: string;
}

/**
 * Credits 页面 - 积分/余额管理
 */
export default function CreditsPage() {
  const { user, loading, refresh } = useAuth();
  const [logs, setLogs] = useState<UsageLog[]>([]);
  const [logsLoading, setLogsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchLogs();
    }
  }, [user]);

  const fetchLogs = async () => {
    try {
      const res = await fetch('/api/user/logs');
      if (res.ok) {
        const data = await res.json();
        setLogs(data);
      }
    } finally {
      setLogsLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center py-32">
        <div className="text-gray-500">加载中...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="w-full">
        <section className="w-full max-w-4xl mx-auto px-6 py-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">积分余额</h1>
          <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center">
            <p className="text-gray-600 mb-4">请先登录以查看你的积分余额</p>
            <Link
              href="/login"
              className="inline-block px-6 py-2 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white rounded-xl font-medium hover:opacity-90"
            >
              登录
            </Link>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="w-full">
      <section className="w-full max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">积分余额</h1>
        <p className="text-xl text-gray-600 mb-12">
          管理你的生成积分
        </p>

        {/* 积分余额卡片 */}
        <div className="bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-2xl p-8 text-white mb-8">
          <p className="text-violet-100 mb-2">当前余额</p>
          <p className="text-6xl font-bold mb-4">¥{user.balance.toFixed(2)}</p>
          <p className="text-violet-100">可生成约 {Math.floor(user.balance / 0.5)} 张图片</p>
        </div>

        {/* 使用历史 */}
        <div className="bg-white rounded-2xl border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">使用记录</h2>
          {logsLoading ? (
            <div className="text-center text-gray-500 py-8">加载中...</div>
          ) : logs.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              暂无使用记录
            </div>
          ) : (
            <div className="space-y-4">
              {logs.map((log) => (
                <div key={log.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                  <div>
                    <p className="font-medium text-gray-900">{log.modelName}</p>
                    <p className="text-sm text-gray-600 truncate max-w-md" title={log.prompt}>
                      {log.prompt || '图片生成'}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(log.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-red-600 font-medium">-¥{log.cost.toFixed(2)}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      log.status === 'success'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {log.status === 'success' ? '成功' : '失败'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 充值按钮 */}
        <button className="mt-8 px-6 py-3 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white rounded-xl font-medium hover:opacity-90 transition-opacity">
          充值余额
        </button>
      </section>
    </div>
  );
}
