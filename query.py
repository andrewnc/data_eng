import requests

def query_for_machine(host):
    return requests.post("http://127.0.0.1:5984/resources/_find/", json={"selector":{"host":{"$eq": host}}}).text

if __name__ == "__main__":
    print(query_for_machine("192.168.65.3"))