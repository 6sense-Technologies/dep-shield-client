FROM node:24-alpine

LABEL org.opencontainers.image.source="https://github.com/6sense-Technologies/dep-shield-client"

WORKDIR /dep-shield-client
COPY . .
RUN npm ci && npm run build

EXPOSE 3000
CMD ["npm", "start"]
