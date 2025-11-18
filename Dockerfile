FROM node:20

# Create app directory inside container
WORKDIR /ZombieReg

# Copy package.json first (for caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the project
COPY . .

EXPOSE 3000

CMD ["node", "server.js"]
