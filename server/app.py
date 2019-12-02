from __future__ import print_function
import os
import sys
import requests
import json
import socket
from flask import Flask, jsonify, abort, make_response, request, url_for, send_from_directory
from flask_cors import CORS, cross_origin
from flask_restful import Resource, Api
from json import dumps
from flask_jsonpify import jsonify
from werkzeug.routing import BaseConverter

app = Flask(__name__)
api = Api(app)

CORS(app)

PORT = os.environ.get('PORT')

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


@app.route('/api', methods=['POST'])
def get_report():

    print('Generating report for: ')
    valid_url = 'http://testsafebrowsing.appspot.com/s/phishing.html'

    # malicious_link = request.get_json()
    malicious_link = 'graphicriver.com'
    print(malicious_link)
    google_api_key = "AIzaSyACYRvOdtNKzInQHA9cYEIFJFy_CFYJln8"
    preview_api_key = "5de43a3f162bca6a55efeaa80dc7c7ac653bbc3da861c"


    google_api_url = "https://safebrowsing.googleapis.com/v4/threatMatches:find"
    preview_api_url = "http://api.linkpreview.net/?key=5de43a3f162bca6a55efeaa80dc7c7ac653bbc3da861c&q=" + malicious_link

    payload = {'client': {'clientId': "mycompany", 'clientVersion': "0.1"},
            'threatInfo': {'threatTypes': ["SOCIAL_ENGINEERING", "MALWARE"],
                            'platformTypes': ["ANY_PLATFORM"],
                            'threatEntryTypes': ["URL"],
                            'threatEntries': [{'url': "textspeier.de"}]}}

    params = {'key': google_api_key}
    try:
        ip_report = socket.getaddrinfo(malicious_link, None, socket.AF_INET6)
        print(ip_report)
    except:
        print("Could not analyze the malicious URL ip")

    google_report = requests.post(google_api_url, params=params, json=payload)
    preview_report = requests.get(preview_api_url)

    print(google_report.json())

    return jsonify({
        'status': 'success',
        'message': valid_url,
        'responseObject': {
            'googleReport': google_report.json(), 
            'linkPreview': preview_report.json()
        }
    })

@app.errorhandler(500)
def server_error(e):
    return 'An internal error occurred [main.py] %s' % e, 500


# === Angular Routing ===
__angular_paths = []
__angular_default_path = "index.html"
__root = "dist/"

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
    
    return send_from_directory('dist/', path)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=80)