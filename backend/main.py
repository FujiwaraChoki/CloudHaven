from flask import Flask, request
from flask_cors import CORS
import json
import base64 as b64

app = Flask(__name__)
CORS(app)

def create_link(file_name):
    return 'http://localhost:5000/download?file_name=' + file_name

def parse_data(data):
    return json.loads(data.decode())

@app.route('/download', methods=['GET'])
def download():
    with open(request.args.get('file_name'), 'r') as file:
        return file.read()

def create_file(file_name, file_content):
    # First, decode the file_content from base64 to bytes
    file_content = b64.b64decode(file_content)

    with open(file_name, 'wb') as file:
        file.write(file_content)

# Upload route, accepts file_name and file_content as POST Parameters
@app.route('/upload', methods=['POST'])
def upload():
    args = parse_data(request.data)
    file_name = args['file_name']
    try:
        file_content = args['file_content']
    except KeyError:
        file_content = None

    if file_content is not None:
        create_file(file_name, file_content)

    return {
        'link': create_link(file_name)
    }


# Run
if __name__ == '__main__':
    app.run()