import os
import json
import datetime
from bson.objectid import ObjectId
from flask import Flask
from flask_pymongo import PyMongo
from flask_jwt_extended import JWTManager
# Used for password encryption before saving to database => similar to NodeJs bycrypt
from flask_bcrypt import Bcrypt
from flask_cors import CORS, cross_origin

class JSONEncoder(json.JSONEncoder):
    ''' extend json-encoder class'''

    def default(self, o):
        if isinstance(o, ObjectId):
            return str(o)
        if isinstance(o, set):
            return list(o)
        if isinstance(o, datetime.datetime):
            return str(o)
        return json.JSONEncoder.default(self, o)

# create the flask object
app = Flask(__name__)
CORS(app)

# app.config['MONGO_URI'] = os.environ.get('DB')
app.config['MONGO_URI'] = 'mongodb://mongodb:27017/webtech'

# app.config['JWT_SECRET_KEY'] = os.environ.get('SECRET')
app.config['JWT_SECRET_KEY'] = 'SECRETBFBECA'
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = datetime.timedelta(days=1)
mongo = PyMongo(app)
# BCrypt object used to save to db
flask_bcrypt = Bcrypt(app)

jwt = JWTManager(app)
app.json_encoder = JSONEncoder

@app.errorhandler(500)
def server_error(error):
    ''' 500 error handler '''
    LOG.error(error)
    return make_response(jsonify({'error': 'An internal error occurred [main.py] %s'}), 500)

@app.errorhandler(404)
def not_found(error):
    """ 404 error handler """
    LOG.error(error)
    return make_response(jsonify({'error': 'Not found'}), 404)

from app.controllers import *