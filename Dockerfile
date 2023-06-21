# Choose a base image
FROM node:16-alpine

# Set working directory in the Docker container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies in the Docker container
RUN npm install --legacy-peer-deps

# Copy the rest of your app's source code from your host to your image filesystem.
COPY . .

# Build the application
RUN npm run build

# Set the command to start the node-server
CMD [ "npm", "start" ]
