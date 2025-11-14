import requests

payload = {
    "text": "Flood in delhi region please help immediately my name is idk",
    "region": "gujarat"
}

res = requests.post("http://127.0.0.1:8000/translate", json=payload)
print("Status:", res.status_code)
print("Response:", res.json())
