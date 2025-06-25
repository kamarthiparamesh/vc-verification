FROM node:20-slim

# Install system dependencies first
RUN apt-get update && apt-get install -y \
    nginx \
    bash \
    curl \
    build-essential \
    python3 \
    && apt-get clean

WORKDIR /app

# Copy package manifests and install dependencies
COPY package.json ./

# Install all dependencies and rebuild lightningcss for the current platform
RUN npm install --legacy-peer-deps --include=optional && \
    npm rebuild lightningcss

# Copy the rest of the app source code
COPY . .

# Copy nginx config and entrypoint
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY ./start.sh /start.sh
RUN chmod +x /start.sh

EXPOSE 80

CMD ["/start.sh"]
