FROM node:22-slim

WORKDIR /app

# Копируем root (важно для workspaces)
COPY package*.json ./

# Копируем package.json API отдельно (для кеша)
COPY apps/api/package*.json ./apps/api/

# Если есть packages — ОБЯЗАТЕЛЬНО:
COPY packages ./packages

# Установка зависимостей
RUN npm install

# Копируем остальной код
COPY . .

WORKDIR /app/apps/api

EXPOSE 3001

CMD ["npm", "run", "dev"]