'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Box } from 'lucide-react';
import type { Model, Provider } from '@/lib/types';

interface ModelWithProvider extends Model {
  providerName: string;
}

export default function ModelsPage() {
  const [models, setModels] = useState<ModelWithProvider[]>([]);
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingModel, setEditingModel] = useState<Model | null>(null);

  const [form, setForm] = useState({
    name: '',
    modelId: '',
    providerId: '',
    type: 'text2img' as const,
    pricePerCall: 0,
    status: 'active' as const,
    defaultWidth: 1024,
    defaultHeight: 1024,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [modelsRes, providersRes] = await Promise.all([
        fetch('/api/admin/models'),
        fetch('/api/admin/providers'),
      ]);

      if (modelsRes.ok) {
        setModels(await modelsRes.json());
      }
      if (providersRes.ok) {
        setProviders(await providersRes.json());
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const url = '/api/admin/models';
    const method = editingModel ? 'PUT' : 'POST';
    const body = {
      ...(editingModel ? { id: editingModel.id } : {}),
      name: form.name,
      modelId: form.modelId,
      providerId: form.providerId,
      type: form.type,
      pricePerCall: form.pricePerCall,
      status: form.status,
      config: {
        defaultWidth: form.defaultWidth,
        defaultHeight: form.defaultHeight,
      },
    };

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      fetchData();
      closeModal();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('确定要删除这个模型吗？')) return;

    const res = await fetch(`/api/admin/models?id=${id}`, { method: 'DELETE' });
    if (res.ok) {
      fetchData();
    }
  };

  const openModal = (model?: Model) => {
    if (model) {
      setEditingModel(model);
      setForm({
        name: model.name,
        modelId: model.modelId,
        providerId: model.providerId,
        type: model.type,
        pricePerCall: model.pricePerCall,
        status: model.status,
        defaultWidth: model.config?.defaultWidth || 1024,
        defaultHeight: model.config?.defaultHeight || 1024,
      });
    } else {
      setEditingModel(null);
      setForm({
        name: '',
        modelId: '',
        providerId: providers[0]?.id || '',
        type: 'text2img',
        pricePerCall: 0,
        status: 'active',
        defaultWidth: 1024,
        defaultHeight: 1024,
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingModel(null);
  };

  if (loading) {
    return (
      <div className="max-w-6xl">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-48 mb-8"></div>
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <div className="h-64 bg-gray-100 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">模型管理</h1>
          <p className="text-gray-600">管理可用的生图模型</p>
        </div>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-medium rounded-xl hover:opacity-90 transition-opacity shadow-sm disabled:opacity-50"
          disabled={providers.length === 0}
        >
          <Plus size={20} />
          添加模型
        </button>
      </div>

      {providers.length === 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-6">
          <p className="text-amber-800">
            请先在「服务商管理」中添加至少一个服务商，才能添加模型。
          </p>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                模型
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                模型ID
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                服务商
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                类型
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                价格/次
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                状态
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                操作
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {models.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-16 text-center">
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-fuchsia-100 to-pink-100 flex items-center justify-center mb-4">
                      <Box size={32} className="text-fuchsia-500" />
                    </div>
                    <p className="text-gray-500 mb-4">暂无模型</p>
                    {providers.length > 0 && (
                      <button
                        onClick={() => openModal()}
                        className="text-violet-600 hover:text-violet-700 font-medium"
                      >
                        添加第一个模型
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ) : (
              models.map((model) => (
                <tr key={model.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-fuchsia-500 to-pink-500 flex items-center justify-center">
                        <Box size={20} className="text-white" />
                      </div>
                      <span className="font-medium text-gray-900">{model.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <code className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded font-mono">
                      {model.modelId}
                    </code>
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {model.providerName}
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex px-3 py-1 text-xs font-medium rounded-full bg-violet-100 text-violet-700">
                      {model.type === 'text2img' ? '文生图' : '图生图'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-900 font-medium">
                    ¥{model.pricePerCall.toFixed(2)}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${
                        model.status === 'active'
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {model.status === 'active' ? '启用' : '禁用'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => openModal(model)}
                        className="p-2 text-gray-500 hover:text-violet-600 hover:bg-violet-50 rounded-lg transition-colors"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(model.id)}
                        className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 m-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {editingModel ? '编辑模型' : '添加模型'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  显示名称
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all bg-white text-gray-900"
                  placeholder="如: DALL-E 3, Stable Diffusion XL"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  模型 ID
                </label>
                <input
                  type="text"
                  value={form.modelId}
                  onChange={(e) => setForm({ ...form, modelId: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all font-mono"
                  placeholder="如: dall-e-3, stable-diffusion-xl-1024-v1-0"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  服务商
                </label>
                <select
                  value={form.providerId}
                  onChange={(e) => setForm({ ...form, providerId: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all bg-white text-gray-900"
                  required
                >
                  <option value="">选择服务商</option>
                  {providers.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  类型
                </label>
                <select
                  value={form.type}
                  onChange={(e) =>
                    setForm({ ...form, type: e.target.value as 'text2img' | 'img2img' })
                  }
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all bg-white text-gray-900"
                >
                  <option value="text2img">文生图</option>
                  <option value="img2img">图生图</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  每次调用价格 (¥)
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={form.pricePerCall}
                  onChange={(e) =>
                    setForm({ ...form, pricePerCall: parseFloat(e.target.value) || 0 })
                  }
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all bg-white text-gray-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    默认宽度
                  </label>
                  <input
                    type="number"
                    value={form.defaultWidth}
                    onChange={(e) =>
                      setForm({ ...form, defaultWidth: parseInt(e.target.value) || 1024 })
                    }
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all bg-white text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    默认高度
                  </label>
                  <input
                    type="number"
                    value={form.defaultHeight}
                    onChange={(e) =>
                      setForm({ ...form, defaultHeight: parseInt(e.target.value) || 1024 })
                    }
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all bg-white text-gray-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  状态
                </label>
                <select
                  value={form.status}
                  onChange={(e) =>
                    setForm({ ...form, status: e.target.value as 'active' | 'disabled' })
                  }
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all bg-white text-gray-900"
                >
                  <option value="active">启用</option>
                  <option value="disabled">禁用</option>
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 px-4 py-3 border border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-medium rounded-xl hover:opacity-90 transition-opacity"
                >
                  {editingModel ? '保存' : '添加'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
