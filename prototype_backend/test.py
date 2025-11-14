import requests

payload = {
    "text": "Evacuation orders have been issued for the coastal areas due to the approaching cyclone.",
    "region": "delhi"
}

res = requests.post("http://127.0.0.1:8000/translate", json=payload)
print("Status:", res.status_code)
print("Response:", res.json())
