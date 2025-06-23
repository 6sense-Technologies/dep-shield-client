FROM node:20-alpine3.17

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install --force

# Bundle your app source
COPY . .

# Build the Next.js app for production
RUN npm run build

# Expose the port that your Next.js app will run on
EXPOSE 3000

# Define the command to run your app using Next.js
CMD ["npm", "start"]