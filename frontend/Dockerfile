FROM node:10

WORKDIR /app

# only if production
ENV NODE_ENV=production
ENV PATH /app/node_modules/.bin:$PATH

# Install dependencies
COPY package.json package-lock.json ./

RUN npm install 
RUN npm install -g npm
RUN npm install axios --save
RUN npm install react-router-dom
RUN npm install --save react-chartjs-2 chart.js
RUN npm install react-icons --save


COPY . ./

RUN useradd user
USER user

CMD npm start


EXPOSE 3000

