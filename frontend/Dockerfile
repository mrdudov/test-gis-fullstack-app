FROM node:20-alpine
EXPOSE 4200
WORKDIR /app
RUN npm install -g @angular/cli@latest
COPY ./frontend/package.json ./frontend/package-lock.json /app/
RUN npm install
COPY ./frontend /app
RUN echo "Start serving Angular app..."
CMD ["ng", "serve", "--host", "0.0.0.0", "--disable-host-check", "--poll", "1000"]