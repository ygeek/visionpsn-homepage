FROM ubuntu:xenial

# Install Nginx
RUN apt-get update
RUN apt-get -y install nginx && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Copy dist
ADD . /root/webapp
WORKDIR /root/webapp

# Copy dist
COPY nginx.conf /etc/nginx/conf.d/default.conf
RUN rm -f /etc/nginx/sites-enabled/* && cp -r ./ /usr/share/nginx/html

EXPOSE 80

# Start Script
ADD container_start.sh /start.sh
CMD /bin/bash /start.sh