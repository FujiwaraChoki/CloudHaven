from flask import Flask, request
from flask_cors import CORS
import json
import os
import base64 as b64

app = Flask(__name__)
CORS(app)

def create_link(file_name):
    return 'http://localhost:5000/download?file_name=' + file_name

def parse_data(data):
    return json.loads(data.decode())

def make_response(file_content):
    response = app.response_class(
        response=file_content,
        status=200,
        mimetype='application/octet-stream'
    )

    return response

@app.route('/download', methods=['GET'])
def download():
    file_name = request.args.get('file_name')

    if not os.path.exists(file_name):
        return {
            'error': 'File does not exist'
        }

    with open(file_name, 'rb') as file:
        file_content = file.read()

        response = make_response(file_content)
        response.headers.set('Content-Disposition', 'attachment', filename=file_name)
        return response


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

@app.route('/files', methods=['GET'])
def files():
    # Get every file in the current directory except main.py
    files = [file for file in os.listdir('.') if file != 'main.py']

    # Create new list, then get creation date, size and type of every file
    files_info = []
    for file in files:
        file_info = {
            'name': file,
            'creation_date': os.path.getctime(file),
            'size': os.path.getsize(file),
            'type': os.path.splitext(file)[1],
            'link': create_link(file)
        }

        files_info.append(file_info)

    return {
        'files': files_info
    }

# Run
if __name__ == '__main__':
    app.run()