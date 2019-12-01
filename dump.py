import os
import json
from flask import Flask, request, send_from_directory, render_template, make_response
from flask_cors import CORS, cross_origin
from flask_restful import Resource, Api
from json import dumps
from flask_jsonpify import jsonify
from werkzeug.routing import BaseConverter

# static_url_path="", static_folder="../client/dist/"
app = Flask(__name__)
api = Api(app)

CORS(app)

# class RegexConverter(BaseConverter):
#     def __init__(self, url_map, *items):
#         super(RegexConverter, self).__init__(url_map)
#         self.regex = items[0]

# app.url_map.converters['regex'] = RegexConverter

class Accounts(Resource):
    def get(self):
        return {'accounts': [{'id': 1, 'username': 'user1'}, {'id': 2, 'username': 'user2'}]}

class Usernames(Resource):
    def get(self, account_id):
        print('Account id:' + account_id)
        result = {'account': {'id':1, 'username':'Balram'}}
        return jsonify(result) 

# Routing
api.add_resource(Accounts, '/accounts')
api.add_resource(Usernames, '/accounts/<account_id>') # Route_3

# @app.route("/")
# def angular():
#     return send_from_directory("../client/dist", "index.html") 

@app.route("/api")
def hello():
    return "Send nudes!"

@app.errorhandler(500)
def server_error(e):
  return 'An internal error occurred [main.py] %s' % e, 500


# === Angular Routing ===
__angular_paths = []
__angular_default_path = "index.html"
__root = "../client/dist/"

for root, subdirs, files in os.walk(__root):
    if len(root) > len(__root):
        root += "/"

    for file in files:
        relativePath = str.replace(root + file, __root, "")
        __angular_paths.append(relativePath)

# Capture all remaining routes
@app.route('/<path:path>')
@app.route('/', defaults={'path': ''})
def angular(path):    
    if path not in __angular_paths:
        path = __angular_default_path
    
    return send_from_directory('../client/dist/', path)

# @app.route("/<regex('\w\.(js|css)'):path>")
# def angular_src(path):
#     return send_from_directory("../client/dist", path)

if __name__ == '__main__':
    app.run(debug=True)