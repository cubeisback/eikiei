FROM node:22-bookworm

WORKDIR /app

COPY package*.json ./
COPY apps/web/package*.json ./apps/web/

RUN npm install

COPY . .

WORKDIR /app/apps/web

EXPOSE 3000

CMD ["npm", "run", "dev"]
