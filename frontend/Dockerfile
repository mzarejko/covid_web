FROM node:10

WORKDIR /app


RUN npm install 
RUN npm install -g npm
RUN npm install axios
RUN npm install react-router-dom
RUN npm install --save react-chartjs-2 chart.js
RUN npm install react-icons --save

# Install dependencies
COPY package.json package-lock.json node_modules ./



COPY . ./


EXPOSE 3000

CMD npm start
