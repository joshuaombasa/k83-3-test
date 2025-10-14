# Use the lightweight Node.js Alpine image
FROM node:alpine

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if exists) first
# This allows Docker to cache npm install unless dependencies change
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application code
COPY . .

# Expose a port if your app listens on one (optional, e.g., 3000)
# EXPOSE 3000

# Start the application
CMD ["npm", "start"]
