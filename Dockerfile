FROM node

WORKDIR /application

COPY ./package.json .
COPY ./package-lock.json .

RUN npm install

COPY ./assets/ ./frontend/assets/

COPY ./output/ .

EXPOSE 7070/tcp

CMD ["node", "backend/index.js"]
