# Source image
FROM node
# Set environment port and expose it
ARG PORT=3000
ENV PORT=$PORT
EXPOSE $PORT
# Update npm to its latest version
RUN npm i npm@latest -g
# Copy directory and install dependencies from the project
WORKDIR /iot-frontend
COPY package.json ./
RUN npm install
# Copy the source code
COPY . .
# Unprivileged user
# USER node
# Run the app
CMD ["node", "./bin/www"]
