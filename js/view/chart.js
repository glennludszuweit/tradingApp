export default function chart(label, data1, data2) {
  let ctx = document.getElementById('myChart').getContext('2d');
  if (myChart != undefined) myChart.destroy();
  myChart = new Chart(ctx, {
    type: chartType,
    data: {
      labels: label,
      datasets: [
        {
          label: ['High'],
          data: data1,
          borderWidth: 2,
          lineTension: 0,
          borderColor: '#46CF9A',
          backgroundColor: 'rgba(0,0,0, 0.1)',
        },
        {
          label: ['Low'],
          data: data2,
          borderWidth: 2,
          lineTension: 0,
          borderColor: '#fa4e3b',
          backgroundColor: 'rgba(0,0,0, 0.1)',
        },
      ],
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: false,
            },
          },
        ],
      },
    },
  });
}
