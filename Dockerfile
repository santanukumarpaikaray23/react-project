### Author : Dewhive Enterprises Private Limited
### Description : Dockerfile to build the Dewhive Frontend

# Source Image
FROM node:14.5

# Dewhive maintains the Dockerfile
MAINTAINER devops-build1@dewhive.com

# Setting Working directory. All the path will be relative to WORKDIR
WORKDIR /usr/src/app

# Copying source files
COPY . .

# Installing dependencies
RUN npm install

# Expose the port
EXPOSE 3000

# Running the app
CMD [ "npm","start" ]