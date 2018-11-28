import requests
import json
from prometheus_client.parser import text_string_to_metric_families
import time
import datetime


with open("hosts.txt") as f:
    s = f.read()

host_list = s.split("\n")[:-1]


# host_list = ['192.168.65.1', '192.168.65.2','192.168.65.3','192.168.65.4','192.168.65.5','192.168.65.6','192.168.65.7','192.168.65.8','192.168.65.9']

def get_host_info(url):
    return url.split(":")[1].split("//")[-1] # just ip information

def get_metrics(url):
    raw_text = requests.get(url).text
    parsed_metrics = list(text_string_to_metric_families(raw_text))
    metrics = {} 
    for family in parsed_metrics:                                                        
        for sample in family.samples:
            metrics[sample[0]] = sample[2]
    metrics['host'] = get_host_info(url)
    now = datetime.datetime.now()
    timestamp = now.strftime("%d_%m_%Y_%H_%M_%S")
    metrics['timestamp'] = timestamp
    return metrics

def post_metrics(metrics):
    try:
        requests.post("http://127.0.0.1:5984/resources", json=metrics)
    except Exception as e:
        print(e)
        print("failed to log") # insert monitoring here
        pass

def monitor(interval=600):
    url_list = ["http://{}:9182/metrics".format(x) for x in host_list]
    while True:
        for url in url_list:
            try:
                metrics = get_metrics(url)
            except:
                metrics = {}
            
            if metrics != {}:
                print("posting for {} at {}".format(metrics['host'], metrics['timestamp']))
                print(metrics)
                post_metrics(metrics)
        time.sleep(interval)


if __name__ == "__main__":
    monitor(5)
