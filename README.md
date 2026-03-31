# Eikiei CRM

Полнофункциональная CRM система на TypeScript с монорепо архитектурой (FSD).

## Стек технологий

### Frontend
- **Next.js** 15.5+ - React фреймворк с App Router
- **React** 19+ - UI библиотека
- **Zustand** - управление состоянием UI/auth
- **TanStack Query** - кеширование серверного состояния
- **Tailwind CSS** - стили

### Backend
- **Fastify** - высокопроизводительный API сервер
- **Prisma** 7.x - ORM для работы с БД
- **Zod** - валидация данных
- **Pino** - структурированное логирование

### Инфраструктура
- **PostgreSQL** - основная БД
- **Redis** - кеш, сессии, pub/sub
- **Docker Compose** - оркестрация контейнеров
- **Socket.IO** - realtime чат/уведомления (в планах)
- **BullMQ** - фоновые задачи (в планах)

## Быстрый старт

### Требования
- Docker & Docker Compose
- Node.js 22+ (для локальной разработки)
- npm (НЕ pnpm!)

### Запуск с Docker

```bash
# Скачать репо, перейти в папку, и запустить
docker-compose up
```

Автоматически запустятся:
- **Next.js Web** - http://localhost:3000 (hot-reload включен)
- **Fastify API** - http://localhost:3001 (hot-reload включен)
- **PostgreSQL** - localhost:5432
- **Redis** - localhost:6379

### Локальная разработка (без Docker)

```bash
# Установить зависимости
npm install

# Запустить все в dev режиме
npm run dev

# В другом терминале:
# Frontend: http://localhost:3000
# API: http://localhost:3001
```

## Структура проекта

```
./
├── apps/
│   ├── api/              # Fastify API сервер
│   │   ├── src/
│   │   │   └── index.ts  # Entry point
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── Dockerfile
│   └── web/              # Next.js фронтенд
│       ├── app/          # App Router (SSR/SSG)
│       ├── public/
│       ├── package.json
│       ├── next.config.ts
│       └── Dockerfile
├── packages/
│   ├── config/           # Шаренные конфигурации
│   ├── shared/           # Утилиты и функции
│   └── ui/               # UI компоненты
├── docker-compose.yml
└── README.md
```

## Разработка

### Hot-Reload

Благодаря volume mounting, изменения кода применяются сразу:

```bash
# Редактируй файлы, сохраняй - изменения видны мгновенно
# /apps/api/src/  → API перезагружается
# /apps/web/app/  → Next.js перезагружается
```

### Просмотр логов

```bash
# Все контейнеры
docker-compose logs -f

# Только API
docker-compose logs -f api

# Только Web
docker-compose logs -f web
```

### Остановка

```bash
# Остановить контейнеры (данные БД сохранятся)
docker-compose down

# Остановить и удалить БД
docker-compose down -v
```

## Скрипты

```bash
# Установить зависимости во всех workspaces
npm install

# Dev режим (локально все приложения)
npm run dev

# Build все приложения
npm run build

# Start production версия
npm run start

# Lint все приложения
npm run lint

# Docker - запустить контейнеры
docker-compose up

# Docker - пересобрать образы
docker-compose up --build
```

## Переменные окружения

### Docker (docker-compose.yml)

```
NODE_ENV=development
DATABASE_URL=postgresql://crm_user:crm_password@postgres:5432/crm_db
REDIS_URL=redis://redis:6379
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### Локальная разработка (.env.local при необходимости)

Скопируй переменные из docker-compose.yml, замени хосты на localhost.

## API Endpoints

### Health Check
```bash
GET /health
# Response: { "status": "ok", "timestamp": "..." }
```

### Ping
```bash
GET /api/ping
# Response: { "message": "pong", "time": 1234567890 }
```

## Дальнейшие шаги

1. **Prisma Setup** - Настроить schema и миграции
2. **Auth** - JWT + refresh tokens (+ OAuth опционально)
3. **Database Migrations** - Создать первые миграции
4. **API Routes** - Добавить CRUD endpoints
5. **UI Components** - Создать компоненты в packages/ui
6. **Socket.IO** - Realtime чат/уведомления
7. **BullMQ** - Фоновые задачи (отправка письма, обработка файлов)
8. **Testing** - Jest unit + Playwright e2e
9. **CI/CD** - GitHub Actions workflows
10. **File Storage** - MinIO для production

## Примечания

- Используем **npm workspaces** для monorepo (не pnpm!)
- **Hot-reload** работает автоматически через Docker volume mounts
- Контейнеры **НЕ пересобираются** при изменении кода - только при изменении зависимостей
- API использует **tsx watch** для dev режима
- Web использует **next dev** (поддерживает hot-reload из коробки)