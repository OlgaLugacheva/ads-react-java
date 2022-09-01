FROM node:16.3.0

EXPOSE 80:8080
# set working directory
WORKDIR /ads-react-java

# add `/app/node_modules/.bin` to $PATH
ENV PATH /ads-react-java/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g --silent

# add app
COPY . ./
RUN npm run build

# start app
CMD ["npm", "start"]