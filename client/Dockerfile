FROM node:14-alpine as builder

WORKDIR /client
RUN npm install -g pnpm
ADD package.json pnpm-lock.yaml /client/
RUN pnpm install

ADD . /client

RUN pnpm run build

# 选择更小体积的基础镜像
FROM nginx:alpine
ADD nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder client/dist /usr/share/nginx/html