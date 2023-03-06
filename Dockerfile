FROM node:16.19.0-alpine3.16 as build-stage 
WORKDIR /app
COPY . ./
ENV GENERATE_SOURCEMAP=false
RUN yarn install 
RUN npm run build; exit 0
RUN npm run build

# Stage 2 - the production environment
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-stage  /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"] 

# # add app
# COPY . ./

# # start app
# CMD ["npm", "start"]