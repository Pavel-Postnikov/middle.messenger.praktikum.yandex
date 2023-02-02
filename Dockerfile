FROM node:16
RUN apt update && apt install -y nodejs && apt install -y npm
WORKDIR /var/www
COPY . .
RUN npm install
EXPOSE 3000
CMD npm run start