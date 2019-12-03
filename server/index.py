# Imports
import os
import datetime
import sys
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

if __name__ == '__main__':
    LOG.info('running environment: %s', os.environ.get('ENV'))
    app.config['DEBUG'] = os.environ.get('ENV') == 'development' # Debug mode if development env
    app.run(host='0.0.0.0', port=8080)