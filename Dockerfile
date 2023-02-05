FROM node:19.6.0-alpine3.17

RUN addgroup app && adduser -S -G app app
USER app

WORKDIR /app
COPY package*.json .
COPY yarn*.lock .

RUN yarn install
COPY . .

ENV API_URL=http://api/my-app.com/
EXPOSE 3001

CMD ["yarn", "start"]

