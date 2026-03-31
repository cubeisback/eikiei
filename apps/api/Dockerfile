FROM node:22-bookworm

WORKDIR /app

# Копируем package.json files для кеширования зависимостей
COPY package*.json ./
COPY packages ./packages
COPY apps/api/package*.json ./apps/api/

RUN npm config set registry https://registry.npmjs.org/ && \
    npm install --legacy-peer-deps --force

# Копируем ВЕСЬ код (включая prisma)
COPY . .

WORKDIR /app/apps/api

# Генерируем Prisma клиент
RUN npx prisma generate

EXPOSE 3001

CMD ["npm", "run", "dev"]