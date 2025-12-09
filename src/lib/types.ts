// 用户类型
export interface User {
  id: string;
  username: string;
  email: string;
  password: string; // hashed
  balance: number; // 余额
  role: 'admin' | 'user';
  status: 'active' | 'disabled';
  createdAt: string;
  updatedAt: string;
}

// API提供商
export interface Provider {
  id: string;
  name: string;
  baseUrl: string;
  apiKey: string;
  status: 'active' | 'disabled';
  createdAt: string;
  updatedAt: string;
}

// 模型配置
export interface Model {
  id: string;
  name: string; // 显示名称
  modelId: string; // 实际模型ID
  providerId: string;
  type: 'text2img' | 'img2img';
  pricePerCall: number; // 每次调用价格
  status: 'active' | 'disabled';
  config: {
    defaultWidth?: number;
    defaultHeight?: number;
    maxWidth?: number;
    maxHeight?: number;
    supportedSizes?: string[];
  };
  createdAt: string;
  updatedAt: string;
}

// 用户API Key
export interface ApiKey {
  id: string;
  userId: string;
  name: string;
  key: string; // sk-xxx
  status: 'active' | 'disabled';
  usageCount: number;
  lastUsedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

// 调用日志
export interface CallLog {
  id: string;
  userId: string;
  apiKeyId: string;
  modelId: string;
  prompt: string;
  negativePrompt?: string;
  parameters: Record<string, unknown>;
  status: 'pending' | 'success' | 'failed';
  cost: number;
  responseTime: number; // ms
  errorMessage?: string;
  imageUrl?: string;
  createdAt: string;
}

// 系统设置
export interface Settings {
  siteName: string;
  siteDescription: string;
  allowRegistration: boolean;
  defaultUserBalance: number;
  adminPassword: string; // hashed
}

// 数据存储结构
export interface DataStore {
  users: User[];
  providers: Provider[];
  models: Model[];
  apiKeys: ApiKey[];
  callLogs: CallLog[];
  settings: Settings;
}
