# ACCOUNT SCHEMA
# Similar to Spring validation form java, we can schemas for each controller type and its validations

from jsonschema import validate
from jsonschema.exceptions import ValidationError
from jsonschema.exceptions import SchemaError

# JSON SCHEMA DOCUMENTATION

account_schema = {
    "type": "object",
    "properties": {
        "name": {
            "type": "string",
        },
        "email": {
            "type": "string",
            "format": "email"
        },
        "password": {
            "type": "string",
            "minLength": 5
        }
    },
    "required": ["email", "password"],
    "additionalProperties": False
}
# "additionalProperties": False => validates for additional variables

def validate_account(request_data):
    try:
        validate(request_data, account_schema)
    except ValidationError as e:
        return {'status': False, 'message': e}
    except SchemaError as e:
        return {'status': False, 'message': e}
    return {'status': True, 'data': request_data}