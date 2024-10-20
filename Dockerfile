FROM node:18 as build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:18-slim
WORKDIR /app
COPY --from=build /app/dist /app/dist
RUN npm install -g serve
CMD ["serve", "-s", "dist"]
EXPOSE 3000
