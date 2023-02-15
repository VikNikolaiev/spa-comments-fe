FROM node:14-alpine3.16

WORKDIR /spa-comments-fe

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]