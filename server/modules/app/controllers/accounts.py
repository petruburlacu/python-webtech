import os
import requests
from flask import request, jsonify
from flask_jwt_extended import (create_access_token, create_refresh_token, jwt_required, jwt_refresh_token_required, get_jwt_identity)
from app import app, mongo, flask_bcrypt, jwt
from app.schemas.account import validate_account
import logger

ROOT_PATH = os.environ.get('ROOT_PATH')
LOG = logger.get_root_logger(
    __name__, filename=os.path.join(ROOT_PATH, 'output.log'))

# Followed DUO security API structure: https://duo.com/docs/accountsapi

@app.route('/api/accounts/account/create', methods=['POST'])
def register():
    ''' Account registration '''
    # {'status': boolean, 'message': 'string'}
    request_data = validate_account(request.get_json())
    # Check if request_data is valid -> good format
    if request_data['status']:
        request_data = request_data['data']
        LOG.info(request_data)
        # Encrypt if valid
        request_data['password'] = flask_bcrypt.generate_password_hash(request_data['password'])
        mongo.db.accounts.insert_one(request_data)
        return jsonify({'status': True, 'message': 'User created successfully!'}), 200
    else:
        return jsonify({'status': False, 'message': 'Bad request!'}), 400

# Validate data => check if user exists => check password match
@app.route('/api/accounts/account/authentication', methods=['POST'])
def auth_account():
    ''' Account authentication '''
    request_data = validate_account(request.get_json()) # Look into request validation method to reduce duplicates
    if request_data['status']:
        request_data = request_data['data']
        account = mongo.db.accounts.find_one({'email': request_data['email']}, {"_id": 0})
        LOG.info(account)
        if account and flask_bcrypt.check_password_hash(account['password'], request_data['password']):
            del account['password']
            access_token = create_access_token(identity=request_data)
            refresh_token = create_refresh_token(identity=request_data)
            account['token'] = access_token
            account['refresh'] = refresh_token
            return jsonify({'status': True, 'data': account}), 200
        else:
            return jsonify({'status': False, 'message': 'invalid username or password'}), 401
    else:
        return jsonify({'status': False, 'message': 'Bad request parameters: {}'.format(request_data['message'])}), 400

@app.route('/api/accounts/account/refresh_token', methods=['POST'])
@jwt_refresh_token_required
def refresh_token():
    ''' Refresh authentication token JWT '''
    account = get_jwt_identity()
    token_session = {
            'token': create_access_token(identity=account)
    }
    return jsonify({'status': True, 'data': token_session}), 200
    
@jwt.unauthorized_loader
def unauthorized(callback):
    return jsonify({'status': False, 'message': 'Missing Authorization Header'}), 401