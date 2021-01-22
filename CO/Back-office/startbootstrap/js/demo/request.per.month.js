window.onload = function() {
  // Set new default font family and font color to mimic Bootstrap's default styling
  Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
  Chart.defaults.global.defaultFontColor = '#858796';

  fetch('https://safeandsoundpw.herokuapp.com/requests')
    .then(response => response.json())
    .then(requests => {
      console.log(requests);
      const data = {}
      document.getElementById('requestsNumber').innerHTML = requests.length
      requests.forEach(request => {
        //mes e ano de cada pedido
        const date = new Date(request.date)
        const month = date.getMonth() + 1
        const year = date.getFullYear()
        const label = `${month}/${year}`

        if (label in data) {
          data[label] += 1
        }
        else {
          data[label] = 1
        }

      })
      initChart(Object.values(data), Object.keys(data))
    })
  fetch('https://safeandsoundpw.herokuapp.com/occurrences')
    .then(response => response.json())
    .then(occurrences => {
      console.log(occurrences);
      document.getElementById('occurrencesNumber').innerHTML = occurrences.length
      let finishedOccurrences = 0
      let nonFinishedOccurrences = 0
      occurrences.forEach(occurrence => {
        if (occurrence.status == "A decorrer") {
          nonFinishedOccurrences += 1
        }
        else {
          finishedOccurrences += 1
        }
      })
      initPieChart(nonFinishedOccurrences, finishedOccurrences)
    })
}
fetch('https://safeandsoundpw.herokuapp.com/operation_managers')
  .then(response => response.json())
  .then(managers => {
    console.log(managers);
    let availableManagers = 0
    managers.forEach(manager => {
      if (manager.availability == "Disponivel") {
        availableManagers += 1
      }
      document.getElementById('availableManagers').innerHTML = availableManagers
    })
  })



function initChart(data, labels) {
  // Bar Chart Example
  console.log(data)
  console.log(labels)
  var ctx = document.getElementById("myBarChart");
  var myBarChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: "Nº de pedidos: ",
        backgroundColor: "#4e73df",
        hoverBackgroundColor: "#2e59d9",
        borderColor: "#4e73df",
        data: data,
      }],
    },
    options: {
      maintainAspectRatio: false,
      layout: {
        padding: {
          left: 10,
          right: 25,
          top: 25,
          bottom: 0
        }
      },
      scales: {
        xAxes: [{
          time: {
            unit: 'month'
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          ticks: {
            maxTicksLimit: 6
          },
          maxBarThickness: 25,
        }],
        yAxes: [{
          ticks: {
            min: 0,
            maxTicksLimit: 5,
            padding: 10,
          },
          gridLines: {
            color: "rgb(234, 236, 244)",
            zeroLineColor: "rgb(234, 236, 244)",
            drawBorder: false,
            borderDash: [2],
            zeroLineBorderDash: [2]
          }
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        titleMarginBottom: 10,
        titleFontColor: '#6e707e',
        titleFontSize: 14,
        backgroundColor: "rgb(255,255,255)",
        bodyFontColor: "#858796",
        borderColor: '#dddfeb',
        borderWidth: 1,
        xPadding: 15,
        yPadding: 15,
        displayColors: false,
        caretPadding: 10,
        callbacks: {
          label: function(tooltipItem, chart) {
            var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
            return datasetLabel + number_format(tooltipItem.yLabel);
          }
        }
      },
    }
  });
}

function initPieChart(nonFinishedOccurrences, finishedOccurrences) {
  // Pie Chart Example
  var ctx = document.getElementById("myPieChart");
  var myPieChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ["A decorrer", "Terminadas"],
      datasets: [{
        data: [nonFinishedOccurrences, finishedOccurrences],
        backgroundColor: ['#4e73df', '#1cc88a'],
        hoverBackgroundColor: ['#2e59d9', '#17a673'],
        hoverBorderColor: "rgba(234, 236, 244, 1)",
      }],
    },
    options: {
      maintainAspectRatio: false,
      tooltips: {
        backgroundColor: "rgb(255,255,255)",
        bodyFontColor: "#858796",
        borderColor: '#dddfeb',
        borderWidth: 1,
        xPadding: 15,
        yPadding: 15,
        displayColors: false,
        caretPadding: 10,
      },
      legend: {
        display: false
      },
      cutoutPercentage: 80,
    },
  });
}

function number_format(number, decimals, dec_point, thousands_sep) {
  // *     example: number_format(1234.56, 2, ',', ' ');
  // *     return: '1 234,56'
  number = (number + '').replace(',', '').replace(' ', '');
  var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
    dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
    s = '',
    toFixedFix = function(n, prec) {
      var k = Math.pow(10, prec);
      return '' + Math.round(n * k) / k;
    };
  // Fix for IE parseFloat(0.55).toFixed(0) = 0;
  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }
  if ((s[1] || '').length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1).join('0');
  }
  return s.join(dec);
}
