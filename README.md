# Nekoko AI

Nekoko 是一个 AI 图片生成平台，支持文生图功能，具有完整的用户系统和管理后台。

## 功能特性

### 前台功能
- 文生图 - 通过文字描述生成图片
- 用户注册/登录
- 余额管理 - 查看余额和使用记录
- API 密钥管理
- 图片下载

### 管理后台
- 仪表盘 - 数据统计概览
- 服务商管理 - 配置上游 API 服务商
- 模型管理 - 管理可用的生图模型
- 用户管理 - 管理用户账户和余额
- API Key 管理 - 管理用户的 API 密钥
- 调用日志 - 查看所有调用记录
- 系统设置 - 配置网站基本信息

## 技术栈

- **框架**: Next.js 16 (App Router)
- **样式**: Tailwind CSS 4
- **认证**: JWT (jose)
- **密码**: bcryptjs
- **数据存储**: JSON 文件 (可扩展为数据库)

## 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看前台

访问 [http://localhost:3000/admin](http://localhost:3000/admin) 进入管理后台

### 默认账号

**管理后台**
- 用户名: `admin`
- 密码: `admin123`

## 配置上游 API

1. 登录管理后台
2. 进入「服务商管理」添加服务商（如 Gitee AI）
   - Base URL: `https://ai.gitee.com/v1`
   - API Key: 你的 API Key
3. 进入「模型管理」添加模型
   - 模型 ID: `z-image-turbo`
   - 设置价格

## 项目结构

```
src/
├── app/                    # 页面和 API 路由
│   ├── admin/             # 管理后台页面
│   ├── api/               # API 路由
│   │   ├── admin/        # 管理后台 API
│   │   ├── auth/         # 认证 API
│   │   ├── generate/     # 图片生成 API
│   │   ├── models/       # 模型列表 API
│   │   └── user/         # 用户相关 API
│   ├── login/            # 登录页
│   ├── register/         # 注册页
│   └── ...               # 其他页面
├── components/            # React 组件
│   ├── atoms/            # 原子组件
│   ├── molecules/        # 分子组件
│   ├── organisms/        # 组织组件
│   └── admin/            # 管理后台组件
└── lib/                   # 工具函数
    ├── auth.ts           # 认证相关
    ├── store.ts          # 数据存储
    ├── types.ts          # 类型定义
    └── utils.ts          # 工具函数
```

## 环境变量

可选配置（在 `.env.local` 中设置）：

```
JWT_SECRET=your-secret-key
```

## License

MIT
