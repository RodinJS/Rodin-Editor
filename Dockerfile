# Pull base image.
FROM yvnio/nginx
ARG env=dev

MAINTAINER Grigor Khachatryan <g@yvn.io>


# Install Global node packages
RUN npm install -g gulp

RUN rm /etc/nginx/conf.d/default.conf
COPY default.conf /etc/nginx/conf.d

# Pull project
COPY ./ /usr/share/nginx/html
WORKDIR /usr/share/nginx/html
RUN npm i
RUN gulp prod
RUN npm run ${env}

# Define default command.
CMD ["nginx", "-g", "daemon off;"]

# Expose ports.
EXPOSE 80 443