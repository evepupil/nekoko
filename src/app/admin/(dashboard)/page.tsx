import { getStats } from '@/lib/store';
import {
  Users,
  Box,
  Server,
  Activity,
  DollarSign,
  TrendingUp,
} from 'lucide-react';

export default function AdminDashboard() {
  const stats = getStats();

  const cards = [
    {
      title: '总用户数',
      value: stats.totalUsers,
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      title: '服务商数量',
      value: stats.totalProviders,
      icon: Server,
      color: 'bg-green-500',
    },
    {
      title: '模型数量',
      value: stats.totalModels,
      icon: Box,
      color: 'bg-purple-500',
    },
    {
      title: '总调用次数',
      value: stats.totalCalls,
      icon: Activity,
      color: 'bg-orange-500',
    },
    {
      title: '今日调用',
      value: stats.todayCalls,
      icon: TrendingUp,
      color: 'bg-pink-500',
    },
    {
      title: '成功率',
      value: `${stats.successRate}%`,
      icon: DollarSign,
      color: 'bg-cyan-500',
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        仪表盘
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.title}
              className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {card.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                    {card.value}
                  </p>
                </div>
                <div className={`p-3 rounded-lg ${card.color}`}>
                  <Icon size={24} className="text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          快速入门
        </h2>
        <div className="space-y-3 text-gray-600 dark:text-gray-400">
          <p>1. 前往「服务商管理」添加 API 服务商（如 OpenAI、Stability AI 等）</p>
          <p>2. 前往「模型管理」添加可用的生图模型</p>
          <p>3. 用户注册后可以在前台使用生图功能</p>
          <p>4. 在「API Key」页面可以管理用户的 API 密钥</p>
          <p>5. 在「调用日志」页面可以查看所有调用记录</p>
        </div>
      </div>
    </div>
  );
}
