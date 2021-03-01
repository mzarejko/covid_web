FROM node:10

WORKDIR /app


RUN npm install 
RUN npm install -g npm
RUN npm install axios --save
RUN npm install react-router-dom
RUN npm install --save react-chartjs-2 chart.js
RUN npm install react-icons --save

# Install dependencies
COPY package.json package-lock.json ./

COPY . ./

CMD npm start

EXPOSE 3000

