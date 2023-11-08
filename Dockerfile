FROM nginx

WORKDIR /usr/share/nginx/html/
USER root

COPY ./docker/nginx.conf /etc/nginx/conf.d/default.conf

COPY ./dist  /user/share/nginx/html/

EXPOSE 90

CMD ["nginx", "-g", "daemon off;"]
