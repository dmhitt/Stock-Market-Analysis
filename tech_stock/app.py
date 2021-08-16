from flask import Flask, render_template, redirect
from flask_pymongo import PyMongo
from stonks import api_call
from flask import send_from_directory
import os
import json
from bson import json_util
from datetime import datetime
from .config import user_name
from .config import pswd


# initialize flask
app = Flask(__name__)

# initalize mongo connection with pymongo
#mongo = PyMongo(app, uri='mongodb://localhost:27017/stonks')

#Connecting with MongoAtlas on the cloud
base_uri = 'mongodb+srv://'
keys = user_name + ':' + pswd
rest_uri = '@cluster0.d6jv9.mongodb.net/stonks?retryWrites=true&w=majority'
uri = base_uri + keys + rest_uri

mongo = PyMongo(app, uri=uri,connect = False)

@app.route("/")
def home():
	start = datetime.now()
	#stonks_data = api_call()
	#mongo.db.collection.update({}, stonks_data, upsert=True)	
	api_data = mongo.db.collection.find_one()
	end = datetime.now()
	print ("total time =", end - start)
	return render_template("index.html", api_data = api_data)


@app.route("/data")
def stock_data():
    stock_data = mongo.db.collection.find_one()
    return json.loads(json_util.dumps(stock_data))

if __name__ == "__main__":
	app.run(debug=True)	