# REQUEST MODEL SCHEMA
# Similar to Spring validation form java, we can schemas for each controller type and its validations

from jsonschema import validate
from jsonschema.exceptions import ValidationError
from jsonschema.exceptions import SchemaError

# JSON SCHEMA DOCUMENTATION

request_schema = {
    "type": "object",
    "properties": {
        "url": {
            "type": "string",
        }
    },
    "required": ["url"],
    "additionalProperties": False
}
# "additionalProperties": False => validates for additional variables

def validate_request(request_data):
    try:
        validate(request_data, request_schema)
    except ValidationError as e:
        return {'status': False, 'message': e}
    except SchemaError as e:
        return {'status': False, 'message': e}
    return {'status': True, 'data': request_data}