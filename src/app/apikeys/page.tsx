'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { Eye, EyeOff, Copy, Check, Trash2, Plus } from 'lucide-react';
import Link from 'next/link';

interface ApiKey {
  id: string;
  name: string;
  key: string;
  status: string;
  usageCount: number;
  createdAt: string;
}

/**
 * API 页面 - API 文档和密钥管理
 */
export default function APIPage() {
  const { user, loading: authLoading } = useAuth();
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [loading, setLoading] = useState(true);
  const [showKeys, setShowKeys] = useState<Record<string, boolean>>({});
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [newKeyName, setNewKeyName] = useState('');
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    if (user) {
      fetchApiKeys();
    } else {
      setLoading(false);
    }
  }, [user]);

  const fetchApiKeys = async () => {
    try {
      const res = await fetch('/api/user/apikeys');
      if (res.ok) {
        setApiKeys(await res.json());
      }
    } finally {
      setLoading(false);
    }
  };

  const createApiKey = async () => {
    if (!newKeyName.trim()) return;
    setCreating(true);
    try {
      const res = await fetch('/api/user/apikeys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newKeyName }),
      });
      if (res.ok) {
        setNewKeyName('');
        fetchApiKeys();
      }
    } finally {
      setCreating(false);
    }
  };

  const deleteApiKey = async (id: string) => {
    if (!confirm('确定要删除这个 API Key 吗？')) return;
    const res = await fetch(`/api/user/apikeys?id=${id}`, { method: 'DELETE' });
    if (res.ok) {
      fetchApiKeys();
    }
  };

  const toggleKeyVisibility = (id: string) => {
    setShowKeys((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const copyToClipboard = async (key: string, id: string) => {
    await navigator.clipboard.writeText(key);
    setCopiedKey(id);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const maskApiKey = (key: string) => {
    return key.slice(0, 7) + '••••••••••••' + key.slice(-4);
  };

  if (authLoading || loading) {
    return (
      <div className="w-full flex items-center justify-center py-32">
        <div className="text-gray-500">加载中...</div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <section className="w-full max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">API</h1>
        <p className="text-xl text-gray-600 mb-12">
          Integrate Nekoko into your applications
        </p>

        {/* API Keys */}
        <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">API Keys</h2>

          {!user ? (
            <div className="text-center py-8">
              <p className="text-gray-600 mb-4">请先登录以管理你的 API Keys</p>
              <Link
                href="/login"
                className="inline-block px-6 py-2 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white rounded-xl font-medium hover:opacity-90"
              >
                登录
              </Link>
            </div>
          ) : (
            <>
              {/* 已有的 API Keys */}
              <div className="space-y-3 mb-6">
                {apiKeys.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">暂无 API Key，创建一个开始使用</p>
                ) : (
                  apiKeys.map((apiKey) => (
                    <div
                      key={apiKey.id}
                      className="bg-gray-50 rounded-xl p-4 flex items-center justify-between"
                    >
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900 mb-1">{apiKey.name}</p>
                        <div className="flex items-center gap-2">
                          <code className="text-sm text-gray-600 font-mono">
                            {showKeys[apiKey.id] ? apiKey.key : maskApiKey(apiKey.key)}
                          </code>
                          <button
                            onClick={() => toggleKeyVisibility(apiKey.id)}
                            className="text-gray-400 hover:text-gray-600"
                          >
                            {showKeys[apiKey.id] ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                          <button
                            onClick={() => copyToClipboard(apiKey.key, apiKey.id)}
                            className="text-gray-400 hover:text-gray-600"
                          >
                            {copiedKey === apiKey.id ? (
                              <Check size={16} className="text-green-500" />
                            ) : (
                              <Copy size={16} />
                            )}
                          </button>
                        </div>
                        <p className="text-xs text-gray-400 mt-1">
                          调用次数: {apiKey.usageCount} · 创建于 {new Date(apiKey.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <button
                        onClick={() => deleteApiKey(apiKey.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))
                )}
              </div>

              {/* 创建新 Key */}
              <div className="flex gap-3">
                <input
                  type="text"
                  value={newKeyName}
                  onChange={(e) => setNewKeyName(e.target.value)}
                  placeholder="输入 Key 名称（如：生产环境）"
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
                <button
                  onClick={createApiKey}
                  disabled={creating || !newKeyName.trim()}
                  className="px-4 py-2 bg-gray-100 text-gray-900 rounded-xl font-medium hover:bg-gray-200 transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                  <Plus size={18} />
                  {creating ? '创建中...' : '创建 Key'}
                </button>
              </div>
            </>
          )}
        </div>

        {/* Quick Start */}
        <div className="bg-white rounded-2xl border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Start</h2>
          <p className="text-gray-600 mb-4">Generate an image with a simple API call:</p>

          <div className="bg-gray-900 rounded-xl p-6 overflow-x-auto">
            <pre className="text-sm text-gray-100 font-mono">
{`curl -X POST https://api.nekoko.ai/v1/generate \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "prompt": "A mystical cat with glowing eyes",
    "style": "digital-art",
    "ratio": "1:1",
    "quality": "hd"
  }'`}
            </pre>
          </div>

          <a
            href="#"
            className="inline-block mt-6 text-violet-600 hover:text-violet-700 font-medium"
          >
            View Full Documentation →
          </a>
        </div>
      </section>
    </div>
  );
}
