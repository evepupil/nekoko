'use client';

import { useState, useEffect } from 'react';
import { Save, Settings } from 'lucide-react';
import type { Settings as SettingsType } from '@/lib/types';

type SettingsWithoutPassword = Omit<SettingsType, 'adminPassword'>;

export default function SettingsPage() {
  const [settings, setSettings] = useState<SettingsWithoutPassword | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/admin/settings');
      if (res.ok) {
        setSettings(await res.json());
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!settings) return;

    setSaving(true);
    setMessage(null);

    try {
      const body = {
        ...settings,
        ...(newPassword ? { adminPassword: newPassword } : {}),
      };

      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        setMessage({ type: 'success', text: '设置已保存' });
        setNewPassword('');
      } else {
        setMessage({ type: 'error', text: '保存失败' });
      }
    } catch {
      setMessage({ type: 'error', text: '网络错误' });
    } finally {
      setSaving(false);
    }
  };

  if (loading || !settings) {
    return (
      <div className="max-w-2xl">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-48 mb-8"></div>
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <div className="space-y-4">
              <div className="h-12 bg-gray-100 rounded"></div>
              <div className="h-12 bg-gray-100 rounded"></div>
              <div className="h-12 bg-gray-100 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">系统设置</h1>
        <p className="text-gray-600">配置平台的基本设置</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-8">
        {message && (
          <div
            className={`mb-6 p-4 rounded-xl flex items-center gap-3 ${
              message.type === 'success'
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}
          >
            {message.type === 'success' ? (
              <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                <Save size={16} className="text-emerald-600" />
              </div>
            ) : (
              <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                <Settings size={16} className="text-red-600" />
              </div>
            )}
            <span className="font-medium">{message.text}</span>
          </div>
        )}

        <div className="space-y-6">
          {/* 基本设置 */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">基本设置</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  网站名称
                </label>
                <input
                  type="text"
                  value={settings.siteName}
                  onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all bg-white text-gray-900"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  网站描述
                </label>
                <textarea
                  value={settings.siteDescription}
                  onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all resize-none"
                  rows={3}
                />
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200" />

          {/* 用户设置 */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">用户设置</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                <div>
                  <p className="font-medium text-gray-900">允许用户注册</p>
                  <p className="text-sm text-gray-500">开启后新用户可以注册账号</p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setSettings({ ...settings, allowRegistration: !settings.allowRegistration })
                  }
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.allowRegistration
                      ? 'bg-gradient-to-r from-violet-500 to-fuchsia-500'
                      : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-sm ${
                      settings.allowRegistration ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  新用户默认余额 (¥)
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={settings.defaultUserBalance}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      defaultUserBalance: parseFloat(e.target.value) || 0,
                    })
                  }
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all bg-white text-gray-900"
                />
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200" />

          {/* 安全设置 */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">安全设置</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  修改管理员密码
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all bg-white text-gray-900"
                  placeholder="留空则不修改"
                />
                <p className="mt-2 text-sm text-gray-500">
                  默认账号: admin / admin123
                </p>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <button
              onClick={handleSave}
              disabled={saving}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-medium rounded-xl hover:opacity-90 disabled:opacity-50 transition-opacity shadow-sm"
            >
              <Save size={18} />
              {saving ? '保存中...' : '保存设置'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
