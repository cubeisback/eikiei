FROM node:22-alpine

WORKDIR /app

# Копируем package.json files для кеширования зависимостей
COPY package*.json ./
COPY packages ./packages
COPY apps/web/package*.json ./apps/web/

RUN npm config set registry https://registry.npmjs.org/ && \
    npm install --legacy-peer-deps --force

# Копируем конфиги
COPY apps/web/next.config.ts ./apps/web/
COPY apps/web/tsconfig.json ./apps/web/
COPY apps/web/tailwind.config.ts ./apps/web/
COPY apps/web/postcss.config.mjs ./apps/web/
COPY apps/web/eslint.config.mjs ./apps/web/

WORKDIR /app/apps/web

EXPOSE 3000

CMD ["npm", "run", "dev"]