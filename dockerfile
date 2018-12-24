FROM mhart/alpine-node:9

WORKDIR /app
COPY . /app

RUN rm -rf .idea \
    ; rm -rf node_modules \
    ; yarn install

EXPOSE 3000
CMD ["node", "app.js"]
