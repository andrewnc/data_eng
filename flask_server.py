from flask import Flask, render_template, send_from_directory
from query import query_for_machine
import scraper
app = Flask(__name__)

@app.route("/")
def hello():
    hosts = []
    for host in scraper.host_list:
        print(query_for_machine(host))
        hosts.append(query_for_machine(host))
    return render_template("index.html", metrics=hosts.text)


@app.route("/createHighCharts.js")
def send_js():
    return send_from_directory('', 'createHighCharts.js')


if __name__ == "__main__":
    app.run(host='0.0.0.0')