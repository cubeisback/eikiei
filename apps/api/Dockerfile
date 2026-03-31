FROM node:22-alpine

WORKDIR /app

# Установите OpenSSL для Prisma и build tools
RUN apk add --no-cache openssl python3 make g++

# Копируем package.json
COPY package*.json ./
COPY apps/api/package*.json ./apps/api/
COPY packages ./packages

RUN npm config set registry https://registry.npmjs.org/
RUN npm install --legacy-peer-deps --force

# Копируем ВЕСЬ код (включая prisma)
COPY . .

WORKDIR /app/apps/api

# Генерируем Prisma клиент
RUN npx prisma generate

EXPOSE 3001

CMD ["npm", "run", "dev"]