# Stage 1: Build the React application
# Using a Node.js image to build the React frontend
FROM node:20-alpine AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) to leverage Docker cache
# This step is crucial for efficient caching: if dependencies haven't changed,
# Docker won't re-run 'npm install'.
COPY package*.json ./

# Install dependencies. Use 'npm ci' for clean and reproducible installs in CI/CD.
RUN npm ci --loglevel verbose

# Copy the rest of the application source code
COPY . .

# Build the React application for production
# 'npm run build' typically creates a 'build' folder with static assets
RUN npm run build

# Stage 2: Serve the application with Nginx
# Using a lightweight Nginx image for serving the static files
FROM nginx:alpine

# Copy the Nginx configuration file
# This custom configuration will point Nginx to serve the React app's static files
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Remove the default Nginx index.html to prevent conflicts
RUN rm -rf /usr/share/nginx/html/*

# Copy the built React app from the 'build' stage into Nginx's public directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80, which Nginx will listen on
EXPOSE 80

# Command to run Nginx when the container starts
# 'daemon off;' keeps Nginx running in the foreground, essential for Docker containers
CMD ["nginx", "-g", "daemon off;"]