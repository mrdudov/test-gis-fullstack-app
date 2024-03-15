FROM python:3
EXPOSE 5000
WORKDIR /app
COPY ./backend/requirements.txt /app
RUN pip3 install -r requirements.txt
COPY ./backend/* /app
CMD ["flask", "--app", "app.py", "--debug", "run", "--host", "0.0.0.0"]