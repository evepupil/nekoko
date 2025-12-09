import { getStats } from '@/lib/store';
import {
  Users,
  Box,
  Server,
  Activity,
  TrendingUp,
  CheckCircle,
} from 'lucide-react';

export default function AdminDashboard() {
  const stats = getStats();

  const cards = [
    {
      title: '总用户数',
      value: stats.totalUsers,
      icon: Users,
      gradient: 'from-violet-500 to-purple-500',
    },
    {
      title: '服务商数量',
      value: stats.totalProviders,
      icon: Server,
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      title: '模型数量',
      value: stats.totalModels,
      icon: Box,
      gradient: 'from-fuchsia-500 to-pink-500',
    },
    {
      title: '总调用次数',
      value: stats.totalCalls,
      icon: Activity,
      gradient: 'from-orange-500 to-amber-500',
    },
    {
      title: '今日调用',
      value: stats.todayCalls,
      icon: TrendingUp,
      gradient: 'from-emerald-500 to-green-500',
    },
    {
      title: '成功率',
      value: `${stats.successRate}%`,
      icon: CheckCircle,
      gradient: 'from-indigo-500 to-blue-500',
    },
  ];

  return (
    <div className="max-w-6xl">
      <h1 className="text-4xl font-bold text-gray-900 mb-2">仪表盘</h1>
      <p className="text-gray-600 mb-8">平台运营数据概览</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.title}
              className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">{card.title}</p>
                  <p className="text-3xl font-bold text-gray-900">{card.value}</p>
                </div>
                <div className={`p-3 rounded-xl bg-gradient-to-br ${card.gradient}`}>
                  <Icon size={24} className="text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">快速入门</h2>
        <div className="space-y-4">
          {[
            { step: 1, text: '前往「服务商」添加 API 服务商（如 OpenAI、Stability AI 等）' },
            { step: 2, text: '前往「模型」添加可用的生图模型' },
            { step: 3, text: '用户注册后可以在前台使用生图功能' },
            { step: 4, text: '在「API Key」页面可以管理用户的 API 密钥' },
            { step: 5, text: '在「日志」页面可以查看所有调用记录' },
          ].map((item) => (
            <div key={item.step} className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-sm">{item.step}</span>
              </div>
              <p className="text-gray-600">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
