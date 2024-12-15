# Stage 1: Build Stage
FROM node:lts AS builder

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm ci

# Copy application files
COPY . .

# Build the TypeScript project
RUN npm run build

# Stage 2: Production Image
FROM node:lts-slim

# Set environment to production
ENV NODE_ENV=production

# Use a non-root user for better security
USER node

# Create app directory
WORKDIR /usr/src/app

# Copy only necessary production files
COPY package*.json ./

RUN npm ci --production

# Copy built files from builder stage
COPY --from=builder /usr/src/app/dist ./dist

# Expose port for the application
EXPOSE 3000

# Start the server
CMD [ "node", "dist/server.js" ]