# Base image
FROM node:alpine

# Add app code to /code inside container image
ADD . /code

# Set working directory for subsequent commands
WORKDIR /code

# Install dependencies
RUN npm install

# Expose app port
EXPOSE 8080

# Command to run when container starts
ENTRYPOINT ["node", "./src/app.js"]