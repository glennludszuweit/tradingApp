let ctx = document.getElementById('myChart').getContext('2d');
let chartType = 'bar';
let myChart;

export function chart(label, data1, data2) {
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

export function selectChart(label, data1, data2) {
  const type = document.querySelector('.chart-container');
  type.addEventListener('click', (e) => {
    e.preventDefault();
    if (e.target.classList.contains('chart-container')) {
      return;
    }
    chartType = e.target.innerText;
    chart(label, data1, data2);
  });
}

// export default class Chart {
//   constructor(label, data1, data2) {
//     this.label = label;
//     this.data1 = data1;
//     this.data2 = data2;
//   }

//   chart() {
//     if (myChart != undefined) myChart.destroy();
//     myChart = new Chart(ctx, {
//       type: chartType,
//       data: {
//         labels: this.label,
//         datasets: [
//           {
//             label: ['High'],
//             data: this.data1,
//             borderWidth: 2,
//             lineTension: 0,
//             borderColor: '#46CF9A',
//             backgroundColor: 'rgba(0,0,0, 0.1)',
//           },
//           {
//             label: ['Low'],
//             data: this.data2,
//             borderWidth: 2,
//             lineTension: 0,
//             borderColor: '#fa4e3b',
//             backgroundColor: 'rgba(0,0,0, 0.1)',
//           },
//         ],
//       },
//       options: {
//         scales: {
//           yAxes: [
//             {
//               ticks: {
//                 beginAtZero: false,
//               },
//             },
//           ],
//         },
//       },
//     });
//   }

//   selectChart() {
//     const type = document.querySelector('.chart-container');
//     type.addEventListener('click', (e) => {
//       e.preventDefault();
//       chartType = e.target.innerText;
//       this.chart();
//     });
//   }
// }
