FROM traefik:v2.4
RUN mkdir /cert
WORKDIR /cert
COPY letsencrypt/acme.json ./
RUN chmod 600 /cert