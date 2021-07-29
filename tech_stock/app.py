from flask import Flask, render_template, redirect
from flask_pymongo import PyMongo
from stonks import api_call
from flask import send_from_directory
import os
import json
from bson import json_util

# initialize flask
app = Flask(__name__)

# initalize mongo connection with pymongo
mongo = PyMongo(app, uri='mongodb://localhost:27017/stonks')

@app.route("/")
def home():
	stonks_data = api_call()
	mongo.db.collection.update({}, stonks_data, upsert=True)	
	api_data = mongo.db.collection.find_one()
	return render_template("index.html", api_data = api_data)



@app.route("/data")
def stock_data():
    stock_data = mongo.db.collection.find_one()
    return json.loads(json_util.dumps(stock_data))

if __name__ == "__main__":
	app.run(debug=True)	