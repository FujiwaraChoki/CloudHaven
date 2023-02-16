import requests

url = "http://10.0.0.213:9522"

r = requests.post(url + "/upload", json={
    "file_name": "test.txt",
    "file_content": "SGVsbG8gV29ybGQh"
    })

print(r.text)
