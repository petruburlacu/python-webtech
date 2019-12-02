# Imports
import os
import datetime
import sys
import requests
import json
import socket
from flask import Flask, jsonify, abort, make_response, request, url_for, send_from_directory
from json import dumps
from flask_jsonpify import jsonify
from werkzeug.routing import BaseConverter

ROOT_PATH = os.path.dirname(os.path.realpath(__file__))
os.environ.update({'ROOT_PATH': ROOT_PATH})
# Add app module
sys.path.append(os.path.join(ROOT_PATH, 'modules'))

import logger
from app import app

# DEBUG and LOG info
LOG = logger.get_root_logger(os.environ.get(
    'ROOT_LOGGER', 'root'), filename=os.path.join(ROOT_PATH, 'output.log'))

# Port variable
PORT = os.environ.get('PORT')

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
    LOG.info('running environment: %s', os.environ.get('ENV'))
    app.config['DEBUG'] = os.environ.get('ENV') == 'development' # Debug mode if development env
    app.run(host='0.0.0.0', port=80)