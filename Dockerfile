# ── Stage 1: build ────────────────────────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies first (layer-cache friendly)
COPY package*.json ./
RUN npm install

# Copy source
COPY . .

# Build-time env vars baked in by Vite
ARG VITE_API_URL=http://localhost:3001/api/v1
ARG VITE_HOST_APP_URL=http://localhost:3002
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_HOST_APP_URL=$VITE_HOST_APP_URL

RUN npm run build

# ── Stage 2: serve ────────────────────────────────────────────────────────────
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
