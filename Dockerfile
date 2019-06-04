# Source image
FROM node:10.15.0
# Set the api url as an envieroment variable for the build process
ARG API_URL="http://localhost:4000/"
ENV API_URL=$API_URL
# Set environment port and expose it
ARG PORT=3000
ENV PORT=$PORT
EXPOSE $PORT
# Update npm to its latest version
RUN npm i npm@latest -g
# Move to the home directory
WORKDIR /home/app
# Clone repository
RUN git clone --single-branch --branch master https://github.com/pedro-rodalia/iot-frontend.git
# Move to the directory and install dependencies from the project
WORKDIR /home/app/iot-frontend
RUN npm install && npm run build
# Run the app
CMD ["node", "./bin/www"]
