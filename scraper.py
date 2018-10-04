import requests
import json
from prometheus_client.parser import text_string_to_metric_families
import time


def get_host_info(url):
    return url.split(":")[1].split("//")[-1]

def get_metrics(url):
    raw_text = requests.get(url).text
    parsed_metrics = list(text_string_to_metric_families(raw_text))
    metrics = {} 
    for family in parsed_metrics:                                                        
        for sample in family.samples:
            metrics[sample[0]] = sample[2]
    metrics['host'] = get_host_info(url)
    return metrics

def post_metrics(metrics):
    try:
        requests.post("http://admin:slytherin@127.0.0.1:5984/resources", json=metrics)
    except:
        print("failed to log") # insert monitoring here
        pass

def monitor(interval=600):
    host_list = ['192.168.65.1', '192.168.65.2','192.168.65.3','192.168.65.4','192.168.65.5','192.168.65.6','192.168.65.7','192.168.65.8','192.168.65.9']
    url_list = ["http://{}:9182/metrics".format(x) for x in host_list]
    while True:
        for url in url_list:
            try:
                metrics = get_metrics(url)
            except:
                metrics = {}
            
            if metrics != {}:
                post_metrics(metrics)
        time.sleep(interval)


if __name__ == "__main__":
    monitor()