'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  Box,
  Key,
  FileText,
  Settings,
  LogOut,
  Server,
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const menuItems = [
  { href: '/admin', label: '仪表盘', icon: LayoutDashboard },
  { href: '/admin/providers', label: '服务商', icon: Server },
  { href: '/admin/models', label: '模型', icon: Box },
  { href: '/admin/users', label: '用户', icon: Users },
  { href: '/admin/apikeys', label: 'API Key', icon: Key },
  { href: '/admin/logs', label: '日志', icon: FileText },
  { href: '/admin/settings', label: '设置', icon: Settings },
];

interface AdminSidebarProps {
  username: string;
}

export default function AdminSidebar({ username }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-60 bg-slate-50 border-r border-gray-100 flex flex-col">
      {/* 顶部 - 品牌Logo */}
      <div className="p-6 pb-8">
        <Link href="/admin" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-400 to-fuchsia-400 flex items-center justify-center shadow-sm">
            <span className="text-white font-bold text-lg">N</span>
          </div>
          <span className="font-bold text-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
            Admin
          </span>
        </Link>
      </div>

      {/* 中部 - 主导航链接 */}
      <nav className="flex-1 px-4 space-y-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href ||
            (item.href !== '/admin' && pathname.startsWith(item.href));
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200',
                isActive
                  ? 'bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white shadow-sm'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              )}
            >
              <Icon size={20} />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* 底部区域 */}
      <div className="px-4 pb-6 space-y-4">
        {/* 分隔线 */}
        <div className="border-t border-gray-200" />

        {/* 返回前台 */}
        <Link
          href="/"
          className="flex items-center justify-center gap-2 px-4 py-2.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-colors"
        >
          返回前台
        </Link>

        {/* 用户资料 */}
        <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-gray-100">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-400 to-fuchsia-400 flex items-center justify-center">
            <span className="text-white font-bold">{username[0].toUpperCase()}</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">{username}</p>
            <p className="text-xs text-gray-500">管理员</p>
          </div>
        </div>

        {/* 退出登录 */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
        >
          <LogOut size={18} />
          退出登录
        </button>
      </div>
    </aside>
  );
}
