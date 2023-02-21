FROM node:16.19.0-alpine3.16
# set working directory
WORKDIR /build

# add `/app/node_modules/.bin` to $PATH
ENV PATH /build/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY yarn.lock ./
RUN npm install 

# add app
COPY . ./

# start app
CMD ["npm", "start"]