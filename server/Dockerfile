FROM node:14-alpine
# Create app directory
WORKDIR /server
RUN npm install -g pnpm
ADD package.json pnpm-lock.yaml /server/

RUN pnpm install
ADD . /server

EXPOSE 5001

CMD [ "npm", "run", "dev" ]