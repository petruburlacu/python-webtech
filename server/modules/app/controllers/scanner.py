import os
import requests
from flask import request, jsonify
from app import app, mongo
from app.schemas.request import validate_request
import logger

ROOT_PATH = os.environ.get('ROOT_PATH')
LOG = logger.get_root_logger(__name__, filename=os.path.join(ROOT_PATH, 'output.log'))

@app.route('/api/scan', methods=['POST'])
def get_report():
    ''' Producing report '''
    request_data = validate_request(request.get_json())
    # Validate request_data is valid 
    if request_data['status']:
        request_data = request_data['data']
        LOG.info(request_data)

        malicious_link = request_data['url']

        google_api_key = "AIzaSyACYRvOdtNKzInQHA9cYEIFJFy_CFYJln8"
        preview_api_key = "5de43a3f162bca6a55efeaa80dc7c7ac653bbc3da861c"

        LOG.info(malicious_link)

        google_api_url = "https://safebrowsing.googleapis.com/v4/threatMatches:find"
        preview_api_url = "http://api.linkpreview.net/?key=5de43a3f162bca6a55efeaa80dc7c7ac653bbc3da861c&q=" + malicious_link

        google_api_params = {'key': google_api_key}
        google_api_payload = {'client': {'clientId': "mycompany", 'clientVersion': "0.1"},
                'threatInfo': {'threatTypes': ["SOCIAL_ENGINEERING", "MALWARE"],
                                'platformTypes': ["ANY_PLATFORM"],
                                'threatEntryTypes': ["URL"],
                                'threatEntries': [{'url': malicious_link}]}}

        try:
            # Add: API Audit of checks + status
            mongo.db.threats.insert_one(request_data)
        except:
            LOG.info('Could not save the malicious threat in the database')

        google_report = requests.post(google_api_url, params=google_api_params, json=google_api_payload)
        preview_report = requests.get(preview_api_url)

        LOG.info(google_report.json())
        LOG.info('### Generated Report ###')
        LOG.info(preview_report.json())

        return jsonify({'status': True, 'message': 'Success', 'responseObject': { 'googleReport': google_report.json(), 'linkPreview': preview_report.json()}}), 200
    else:
        return jsonify({'status': False, 'message': 'Bad request!', 'responseObject': { 'request': request.get_json(), 'response': request_data}}), 400


# If logged in, can check history of checks
@app.route('/api/scan/audit', methods=['GET'])
def threats_audit():
    try:
        data = mongo.db.threats.find()
        return jsonify({'status': True, 'message':'Malicious threats audit', 'responseObject': { 'data': data.json() }}), 200
    except:
        LOG.info('Could not get the audit of malicious threats from the database')
        return jsonify({'status': False, 'message': 'Could not get audit of threats', 'responseObject': {}}), 400