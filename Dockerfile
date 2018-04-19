FROM ubuntu:xenial

# Install NodeJS
RUN apt-get update && apt-get -y install git build-essential curl
RUN curl -sL https://deb.nodesource.com/setup_7.x | bash -
RUN apt-get install -y nodejs

# Install Nginx
RUN apt-get update
RUN apt-get -y install nginx && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Install Yarn
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
    apt-get update && \
    apt-get install yarn

# Build dist
ADD . /root/webapp
WORKDIR /root/webapp
RUN yarn install
RUN NODE_ENV=production yarn run build

# Copy dist
COPY nginx.conf /etc/nginx/conf.d/default.conf
RUN rm -f /etc/nginx/sites-enabled/* && \
    cp -r assets/* /usr/share/nginx/html && \
    cp -r dist/* /usr/share/nginx/html

EXPOSE 80

# Start Script
ADD container_start.sh /start.sh
CMD /bin/bash /start.sh