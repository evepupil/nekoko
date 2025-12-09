'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { Home, Image, Sparkles, CreditCard, Zap, Key, Settings, Twitter, Github, Linkedin } from 'lucide-react';
import { NavLink } from '@/components/atoms/NavLink';
import { SecondaryNavLink } from '@/components/atoms/SecondaryNavLink';
import { IconButton } from '@/components/atoms/IconButton';
import { UserProfile } from '@/components/molecules/UserProfile';

/**
 * 组织组件 - 侧边栏
 * 包含品牌logo、导航链接、专用链接、社交图标和用户资料
 * 优化后的精致版本，增加间距和视觉层次
 * Nekoko AI 图片生成平台版本 - 支持真实路由导航
 */
export const Sidebar: React.FC = () => {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-60 bg-slate-50 border-r border-gray-100 flex flex-col">
      {/* 顶部 - 品牌Logo */}
      <div className="p-6 pb-8">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-400 to-fuchsia-400 flex items-center justify-center shadow-sm">
            <span className="text-white font-bold text-lg">N</span>
          </div>
          <span className="font-bold text-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
            Nekoko
          </span>
        </div>
      </div>

      {/* 中部 - 主导航链接，增加垂直间距 */}
      <nav className="flex-1 px-4 space-y-2">
        <NavLink
          icon={Home}
          label="Home"
          href="/"
          active={pathname === '/'}
        />
        <NavLink
          icon={Image}
          label="Gallery"
          href="/gallery"
          active={pathname === '/gallery'}
        />
        <NavLink
          icon={Sparkles}
          label="Create"
          href="/create"
          active={pathname === '/create'}
        />
      </nav>

      {/* 底部区域 */}
      <div className="px-4 pb-6 space-y-5">
        {/* 专用链接 - 使用更小的图标和文字 */}
        <div className="space-y-0.5">
          <SecondaryNavLink icon={CreditCard} label="Pricing" href="/pricing" />
          <SecondaryNavLink icon={Zap} label="Credits" href="/credits" />
          <SecondaryNavLink icon={Key} label="API" href="/api" />
          <SecondaryNavLink icon={Settings} label="Settings" href="/settings" />
        </div>

        {/* 分隔线 */}
        <div className="border-t border-gray-200" />

        {/* 社交图标行 */}
        <div className="flex items-center justify-center gap-2">
          <IconButton icon={Twitter} size="sm" variant="ghost" />
          <IconButton icon={Github} size="sm" variant="ghost" />
          <IconButton icon={Linkedin} size="sm" variant="ghost" />
        </div>

        {/* 用户资料 */}
        <UserProfile
          name="John Doe"
          email="john@example.com"
        />
      </div>
    </aside>
  );
};
