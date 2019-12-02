# General API Response model
class ResponseAPI(object):
    status = ""
    response = object

    # The class "constructor" - It's actually an initializer 
    def __init__(self, status, response):
        self.status = status
        self.response = response

def set_response(status, response):
    response = ResponseAPI(status, response)
    return response