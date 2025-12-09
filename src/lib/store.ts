import fs from 'fs';
import path from 'path';
import { DataStore, User, Provider, Model, ApiKey, CallLog, Settings } from './types';
import bcrypt from 'bcryptjs';

const DATA_FILE = path.join(process.cwd(), 'data.json');

// 默认设置
const defaultSettings: Settings = {
  siteName: 'Nekoko AI',
  siteDescription: 'AI 图像生成平台',
  allowRegistration: true,
  defaultUserBalance: 10,
  adminPassword: bcrypt.hashSync('admin123', 10),
};

// 默认数据
const defaultData: DataStore = {
  users: [],
  providers: [],
  models: [],
  apiKeys: [],
  callLogs: [],
  settings: defaultSettings,
};

// 读取数据
export function readData(): DataStore {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const data = fs.readFileSync(DATA_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error reading data file:', error);
  }
  return defaultData;
}

// 写入数据
export function writeData(data: DataStore): void {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error writing data file:', error);
    throw error;
  }
}

// 生成唯一ID
export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

// 生成API Key
export function generateApiKey(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let key = 'sk-';
  for (let i = 0; i < 48; i++) {
    key += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return key;
}

// ==================== Users ====================

export function getUsers(): User[] {
  return readData().users;
}

export function getUserById(id: string): User | undefined {
  return readData().users.find(u => u.id === id);
}

export function getUserByUsername(username: string): User | undefined {
  return readData().users.find(u => u.username === username);
}

export function getUserByEmail(email: string): User | undefined {
  return readData().users.find(u => u.email === email);
}

export function createUser(user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): User {
  const data = readData();
  const newUser: User = {
    ...user,
    id: generateId(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  data.users.push(newUser);
  writeData(data);
  return newUser;
}

export function updateUser(id: string, updates: Partial<User>): User | null {
  const data = readData();
  const index = data.users.findIndex(u => u.id === id);
  if (index === -1) return null;

  data.users[index] = {
    ...data.users[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  writeData(data);
  return data.users[index];
}

export function deleteUser(id: string): boolean {
  const data = readData();
  const index = data.users.findIndex(u => u.id === id);
  if (index === -1) return false;

  data.users.splice(index, 1);
  writeData(data);
  return true;
}

// ==================== Providers ====================

export function getProviders(): Provider[] {
  return readData().providers;
}

export function getProviderById(id: string): Provider | undefined {
  return readData().providers.find(p => p.id === id);
}

export function createProvider(provider: Omit<Provider, 'id' | 'createdAt' | 'updatedAt'>): Provider {
  const data = readData();
  const newProvider: Provider = {
    ...provider,
    id: generateId(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  data.providers.push(newProvider);
  writeData(data);
  return newProvider;
}

export function updateProvider(id: string, updates: Partial<Provider>): Provider | null {
  const data = readData();
  const index = data.providers.findIndex(p => p.id === id);
  if (index === -1) return null;

  data.providers[index] = {
    ...data.providers[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  writeData(data);
  return data.providers[index];
}

export function deleteProvider(id: string): boolean {
  const data = readData();
  const index = data.providers.findIndex(p => p.id === id);
  if (index === -1) return false;

  data.providers.splice(index, 1);
  writeData(data);
  return true;
}

// ==================== Models ====================

export function getModels(): Model[] {
  return readData().models;
}

export function getModelById(id: string): Model | undefined {
  return readData().models.find(m => m.id === id);
}

export function getActiveModels(): Model[] {
  return readData().models.filter(m => m.status === 'active');
}

export function createModel(model: Omit<Model, 'id' | 'createdAt' | 'updatedAt'>): Model {
  const data = readData();
  const newModel: Model = {
    ...model,
    id: generateId(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  data.models.push(newModel);
  writeData(data);
  return newModel;
}

export function updateModel(id: string, updates: Partial<Model>): Model | null {
  const data = readData();
  const index = data.models.findIndex(m => m.id === id);
  if (index === -1) return null;

  data.models[index] = {
    ...data.models[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  writeData(data);
  return data.models[index];
}

export function deleteModel(id: string): boolean {
  const data = readData();
  const index = data.models.findIndex(m => m.id === id);
  if (index === -1) return false;

  data.models.splice(index, 1);
  writeData(data);
  return true;
}

// ==================== API Keys ====================

export function getApiKeys(): ApiKey[] {
  return readData().apiKeys;
}

export function getApiKeysByUserId(userId: string): ApiKey[] {
  return readData().apiKeys.filter(k => k.userId === userId);
}

export function getApiKeyByKey(key: string): ApiKey | undefined {
  return readData().apiKeys.find(k => k.key === key);
}

export function createApiKey(apiKey: Omit<ApiKey, 'id' | 'key' | 'usageCount' | 'lastUsedAt' | 'createdAt' | 'updatedAt'>): ApiKey {
  const data = readData();
  const newApiKey: ApiKey = {
    ...apiKey,
    id: generateId(),
    key: generateApiKey(),
    usageCount: 0,
    lastUsedAt: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  data.apiKeys.push(newApiKey);
  writeData(data);
  return newApiKey;
}

export function updateApiKey(id: string, updates: Partial<ApiKey>): ApiKey | null {
  const data = readData();
  const index = data.apiKeys.findIndex(k => k.id === id);
  if (index === -1) return null;

  data.apiKeys[index] = {
    ...data.apiKeys[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  writeData(data);
  return data.apiKeys[index];
}

export function deleteApiKey(id: string): boolean {
  const data = readData();
  const index = data.apiKeys.findIndex(k => k.id === id);
  if (index === -1) return false;

  data.apiKeys.splice(index, 1);
  writeData(data);
  return true;
}

// ==================== Call Logs ====================

export function getCallLogs(limit?: number): CallLog[] {
  const logs = readData().callLogs.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  return limit ? logs.slice(0, limit) : logs;
}

export function getCallLogsByUserId(userId: string, limit?: number): CallLog[] {
  const logs = readData().callLogs
    .filter(l => l.userId === userId)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  return limit ? logs.slice(0, limit) : logs;
}

export function createCallLog(log: Omit<CallLog, 'id' | 'createdAt'>): CallLog {
  const data = readData();
  const newLog: CallLog = {
    ...log,
    id: generateId(),
    createdAt: new Date().toISOString(),
  };
  data.callLogs.push(newLog);
  writeData(data);
  return newLog;
}

// ==================== Settings ====================

export function getSettings(): Settings {
  return readData().settings;
}

export function updateSettings(updates: Partial<Settings>): Settings {
  const data = readData();
  data.settings = { ...data.settings, ...updates };
  writeData(data);
  return data.settings;
}

// ==================== Stats ====================

export function getStats() {
  const data = readData();
  const today = new Date().toISOString().split('T')[0];
  const todayLogs = data.callLogs.filter(l => l.createdAt.startsWith(today));

  return {
    totalUsers: data.users.length,
    totalProviders: data.providers.length,
    totalModels: data.models.length,
    totalCalls: data.callLogs.length,
    todayCalls: todayLogs.length,
    totalRevenue: data.callLogs.reduce((sum, l) => sum + l.cost, 0),
    todayRevenue: todayLogs.reduce((sum, l) => sum + l.cost, 0),
    successRate: data.callLogs.length > 0
      ? (data.callLogs.filter(l => l.status === 'success').length / data.callLogs.length * 100).toFixed(1)
      : '0',
  };
}
