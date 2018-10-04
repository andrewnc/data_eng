from flask import Flask, render_template
from query import query_for_machine
import scraper
app = Flask(__name__)

@app.route("/")
def hello():
    hosts = []
    for host in scraper.host_list:
        hosts.append(query_for_machine(host))
    return render_template("index.html", metrics=hosts)


if __name__ == "__main__":
    app.run(host='0.0.0.0')