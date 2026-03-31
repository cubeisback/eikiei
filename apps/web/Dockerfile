FROM node:22-bookworm

WORKDIR /app

# копируем ВСЁ
COPY . .

# Сначала ставим зависимости для корневого project
RUN npm install --legacy-peer-deps --force

# идём в web
WORKDIR /app/apps/web

EXPOSE 3000

CMD ["npm", "run", "dev"]