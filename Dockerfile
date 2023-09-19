FROM node:lts

WORKDIR /usr/src/app

COPY package*.json ./

COPY .env ./

RUN npm install\
      && npm install typescript -g
COPY . .
RUN tsc --skipLibCheck

EXPOSE 3000

CMD [ "npm", "start" ]