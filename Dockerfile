FROM node

WORKDIR /application

COPY ./package.json .
COPY ./package-lock.json .

RUN npm install

COPY ./assets/ ./frontend/assets/

COPY ./pkg/word_game_bg.wasm ./frontend/word_game_bg.wasm

COPY ./output/ .

EXPOSE 7070/tcp

CMD ["node", "backend/index.js"]
