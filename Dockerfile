FROM node:14 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM build AS test
RUN npm test

FROM node:14 AS final
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
EXPOSE 3000
CMD [ "node", "dist/commands/cv.seeder.ts" ]
CMD [ "node", "dist/main.js" ]