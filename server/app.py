# Serving angular application from python server: https://stackoverflow.com/questions/45692749/angular-4-frontend-with-python-flask-backend-how-to-render-simple-index-page

# https://flask.palletsprojects.com/en/1.1.x/quickstart/#static-files

# https://stackoverflow.com/questions/53824239/python-flask-serving-angular-projects-index-html-file

# https://stackoverflow.com/questions/25594893/how-to-enable-cors-in-flask

# https://www.techiediaries.com/flask-angular-tutorial/

# https://www.roytuts.com/python-rest-flask-angularjs-crud/

# http://codezup.com/integrate-angular-with-flask-python-tutorial/

# https://blog.miguelgrinberg.com/post/designing-a-restful-api-with-python-and-flask

from flask import Flask, request, send_from_directory, render_template
from flask_cors import CORS, cross_origin
from flask_restful import Resource, Api
from json import dumps
from flask_jsonpify import jsonify

app = Flask(__name__)
api = Api(app)

CORS(app)

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

@app.route("/")
def main():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)