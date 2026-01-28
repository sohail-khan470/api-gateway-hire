FROM node:22-alpine

WORKDIR /app

# 1️⃣ Copy package files first
COPY package*.json ./

# 2️⃣ Install dependencies
RUN npm install && npm install -g nodemon

# 3️⃣ Copy application code
COPY server.js ./
COPY src ./src

EXPOSE 4100

CMD ["npm", "run", "dev"]
