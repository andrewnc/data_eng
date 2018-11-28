# our base image
FROM alpine

#set up time zones
RUN apk add -U tzdata
RUN ln -sf /usr/share/zoneinfo/America/Denver /etc/localtime

# Install python, pip, and g++
RUN apk add --no-cache python3 && \
   python3 -m ensurepip && \
   rm -r /usr/lib/python*/ensurepip && \
   pip3 install --upgrade pip setuptools && \
   if [ ! -e /usr/bin/pip ]; then ln -s pip3 /usr/bin/pip ; fi && \
   if [[ ! -e /usr/bin/python ]]; then ln -sf /usr/bin/python3 /usr/bin/python; fi && \
   rm -r /root/.cache
RUN apk add --update gcc openssl-dev libffi-dev python3-dev
RUN apk --no-cache add musl-dev linux-headers g++

# install pysnmp
RUN pip3 install --upgrade pip
RUN pip3 install pendulum
RUN pip3 install flask
RUN pip3 install requests
RUN pip3 install prometheus_client

# tell the port number the container should expose
EXPOSE 80/tcp

# run the application

# CMD ["cd ~/"]