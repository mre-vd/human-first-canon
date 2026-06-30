FROM node:20-slim
WORKDIR /app

# Install server deps first (better layer caching).
COPY server/package.json ./server/package.json
RUN cd server && npm install --omit=dev

# App code + the static frontend it serves.
COPY server ./server
COPY docs ./docs

ENV PORT=8080
EXPOSE 8080
CMD ["node", "server/server.mjs"]
