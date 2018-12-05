const colorArray = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6',
    '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
    '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
    '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
    '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC',
    '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
    '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
    '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
    '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3',
    '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];
let seriesTotal = [];
let fullJson = document.getElementById('fullJson').innerHTML;
console.log(fullJson);
fullJson = JSON.parse(fullJson);
let nugs = fullJson[0].docs[0];
let categories = [];
let m = 0;
for (let title in nugs) {
    categories.push(title);
    let divId = 'highChart' + m;
    let div = document.createElement('div');
    div.setAttribute("id", divId);
    document.getElementById('stuff2').appendChild(div);
    m++;
}
let k = 0;
for (let json of fullJson) {
    let info = json.docs;
    let series = {};
    let name = "";
    let p = 0;
    for (let data of info) {
        let n = 0;
        for (let id in data) {
            if(p === 0){
                series[categories[n]] = [];
            }
            if (id === categories[n]) {
                series[categories[n]].push(data[id]);
            }
            if (id === 'host') {
                name = data[id];
            }
            n++;
        }
        p++;
    }
    // console.log(series);
    if(series && series['host'] && series['host'][0]){
        seriesTotal.push({
            name: series['host'][0],
            color: colorArray[k],
            data: series
        });
    }
    k++;
}

// console.log(seriesTotal);
let maxSeries = [];
for(let category of categories) {
    let miniSeries = [];
    for (let serie of seriesTotal) {
        // console.log(category);
        // console.log(serie.data[category]);
        miniSeries.push({
            name: serie.data['host'][0],
            data: serie.data[category]
        })
    }
    maxSeries.push(miniSeries);
}
let u = 0;
for(let series of maxSeries){
    let highChartJSON = {
        title: {
            text: 'go_memstats_alloc_bytes'
        },
        chart: {
            type: 'column'
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
        },
        plotOptions: {
            series: {
                label: {
                    connectorAllowed: false
                }
            }
        },
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 1200
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        }
    };
    console.log(series);
    let divId = 'highChart' + u;
    highChartJSON.series = series;
    highChartJSON.title.text = categories[u];
    Highcharts.chart(divId, highChartJSON);
    // console.log(highChartJSON);
    u++;
}

// for (let json of fullJson) {
//     let info = json.docs;
//     let table = document.createElement("TABLE");
//     let ids = [];
//     let i = 0;
//     for (let data of info) {
//         let j = 0;
//         let row = table.insertRow(0);
//         for (let id in data) {
//             if (i === 0) {
//                 ids.push(id);
//             }
//             let cell1 = row.insertCell(j);
//             cell1.innerHTML = data[id];
//             j++;
//         }
//         i++;
//     }
//     k++;
//     let header = table.createTHead();
//     let row = header.insertRow(0);
//     for (let j = 0; j < ids.length; j++) {
//         let cell1 = row.insertCell(j);
//         cell1.innerHTML = ids[j];
//     }
//     document.getElementById('stuff').appendChild(table);
// }

