FROM node:14
WORKDIR ./
COPY ["package*.json","./"]
COPY **/package-lock.json ./
COPY . .
RUN npm install
RUN npm install validator
RUN npm i react-router-dom@6.4.1
RUN npm install react-cookie
RUN npm install react-hook-form
EXPOSE 3000
CMD ["npm", "start"]