# Base and Dependencies
FROM node:22-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Local Development
FROM base AS dev
COPY . .
EXPOSE 4321
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]

# Production Build
FROM base AS builder
COPY . .
RUN npm run build

# Production Server (Nginx) ---
FROM nginx:alpine AS production
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]