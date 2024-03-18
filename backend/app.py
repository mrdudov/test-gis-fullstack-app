from flask import Flask
from flask_cors import CORS
import db

app = Flask(__name__)
cors = CORS(app)


@app.route("/")
def default():
    return db.get_all()


@app.route("/get-a")
def get_a():
    return db.get_A()

@app.route("/get-b")
def get_b():
    return db.get_B()

@app.route("/intersection")
def get_intersection():
    return db.get_intersection()


if __name__ == "__main__":
    app.run()
