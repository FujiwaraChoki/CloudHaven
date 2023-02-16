from flask import Flask, request
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)

# Upload route, accepts file_name and file_content as POST Parameters
@app.route('/upload', methods=['POST'])
def upload():
    print(request.form)
    file_name = request.form['name']
    file_content = request.form['content']
    with open(file_name, 'wb') as f:
        f.write(file_content)

    return json.dumps({'success':True})

# Run
if __name__ == '__main__':
    app.run()