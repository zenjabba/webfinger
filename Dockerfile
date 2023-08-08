# Use Node.js LTS as the base image
FROM node:lts

# Create the app directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the app directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the app's source code to the container
COPY . .

# Expose the port that the app will listen on
EXPOSE 3000

# Command to run the app when the container starts
CMD [ "node", "app.js" ]
