# Use the official Node.js image as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the NestJS application
RUN npm run build

# Expose the port your NestJS application listens on
EXPOSE 8080

# Define the command to run your NestJS application
CMD ["node", "--max-old-space-size=4096", "dist/main.js"]
