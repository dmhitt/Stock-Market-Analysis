from flask import Flask, render_template, redirect
from flask_pymongo import PyMongo
import stonks
#from .stonks import api_call
from flask import send_from_directory
import os
import json
from bson import json_util


# initialize flask
app = Flask(__name__)

# initalize mongo connection with pymongo
#mongo = PyMongo(app, uri='mongodb://localhost:27017/stonks')

#Connecting with MongoAtlas on the cloud
mongo = PyMongo(app, uri='mongodb+srv://dadmin:Niteroi2you!@cluster0.d6jv9.mongodb.net/stonks?retryWrites=true&w=majority')



@app.route("/")
def home():
	stonks_data = stonks.api_call()
	mongo.db.collection.update({}, stonks_data, upsert=True)	
	api_data = mongo.db.collection.find_one()
	return render_template("index.html", api_data = api_data)



@app.route("/data")
def stock_data():
    stock_data = mongo.db.collection.find_one()
    return json.loads(json_util.dumps(stock_data))

if __name__ == "__main__":
	app.run(debug=True)	