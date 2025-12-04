# Gunakan Node.js 20 alpine
FROM node:20-alpine

# Set direktori kerja
WORKDIR /app

# Copy package.json & package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy semua file project
COPY . .

# Expose port React
EXPOSE 3000

# Jalankan React Dev Server di 0.0.0.0 (supaya bisa diakses device lain)
CMD ["npm", "start", "--", "--host", "0.0.0.0"]
