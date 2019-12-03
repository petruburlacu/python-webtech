import os
import requests
import csv
from flask import request, jsonify
from app import app
import logger

ROOT_PATH = os.environ.get('ROOT_PATH')
LOG = logger.get_root_logger(__name__, filename=os.path.join(ROOT_PATH, 'output.log'))


@app.route('/api/threats', methods=['GET'])
def threats_report():
    ''' Threats report '''
    with open('threats.csv', 'r') as file:
        reader = csv.reader(file)
        entries_list = []
        for row in reader:
            entries_list.append({'url': row[0]})
        data = {'data': entries_list}
        return jsonify({'status': True, 'message': 'Success', 'responseObject': data}), 200
    return jsonify({'status': False, 'message': 'Could not get audit of threats', 'responseObject': {}}), 400