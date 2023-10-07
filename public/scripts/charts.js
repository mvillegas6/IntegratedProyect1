(async function () {
  const data = [
    { faculty: 'Ciencias Aplicadas e Ingeniería​', count: lenPostIng },
    { faculty: 'Administración', count: lenPostAdm },
    { faculty: 'Derecho', count: lenPostDer },
    { faculty: 'Artes y Humanidades', count: lenPostArHu },
    { faculty: 'Finanzas, Economía y Gobierno', count: lenPostEco },
  ];

  new Chart(document.getElementById('faculty-bar'), {
    type: 'bar',
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        x: {
          title: {
            color: 'white',
            display: true,
            text: 'Escuelas',
          },
          ticks: {
            color: 'grey',
          },
        },
        y: {
          min: 0,
          title: {
            color: 'white',
            display: true,
            text: 'Publicaciones',
          },
          ticks: {
            stepSize: 1,
            color: 'grey',
          },
        },
      },
    },
    data: {
      labels: data.map((row) => row.faculty),
      datasets: [
        {
          data: data.map((row) => row.count),
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
          ],
          borderWidth: 1,
        },
      ],
    },
  });
})();

(async function () {
  new Chart(document.getElementById('engineering-pie'), {
    type: 'pie',
    options: {
      responsive: true,
      plugins: {
        legend: {
          labels: {
            color: 'white',
          },
        },
      },
    },
    data: {
      labels: [
        'Ingeniería Mecánica',
        'Ingeniería de Procesos',
        'Ingeniería de Producción',
        'Ingeniería de Sistemas',
        'Ingeniería Agronómica',
        'Biología',
        'Geología',
        'Ingeniería Matemática',
        'Ingeniería Física',
        'Ingeniería Civil',
        'Ingeniería de Diseño de Producto',
        'Diseño urbano y gestion habitad',
      ],
      datasets: [
        {
          data: [
            lenIngMec,
            lenIngPro,
            lenIngProdu,
            lenIngSis,
            lenIngAgro,
            lenIngBio,
            lenIngGeo,
            lenIngMate,
            lenIngFis,
            lenIngCiv,
            lenIngIDP,
            lenIngDiHu,
          ],
          hoverOffset: 4,
          backgroundColor: [
            '#ffe5ec',
            '#005F73',
            '#0A9396',
            '#94D2BD',
            '#E9D8A6',
            '#EE9B00',
            '#CA6702',
            '#BB3E03',
            '#AE2012',
            '#9B2226',
            '#a8dadc',
            '#cb997e',
          ],
          borderWidth: 0,
        },
      ],
    },
  });
})();

(async function () {
  new Chart(document.getElementById('administration-pie'), {
    type: 'pie',
    options: {
      responsive: true,
      plugins: {
        legend: {
          labels: {
            color: 'white',
          },
        },
      },
    },
    data: {
      labels: [
        'Administración de Negocios',
        'Negocios Internacionales',
        'Contaduría Pública',
        'Mercadeo',
      ],
      datasets: [
        {
          data: [lenAdmNeg, lenAdmInt, lenAdmCon, lenAdmMer],
          hoverOffset: 4,
          backgroundColor: ['#ffe5ec', '#005F73', '#0A9396', '#94D2BD'],
          borderWidth: 0,
        },
      ],
    },
  });
})();

(async function () {
  new Chart(document.getElementById('law-pie'), {
    type: 'pie',
    options: {
      responsive: true,
      plugins: {
        legend: {
          labels: {
            color: 'white',
          },
        },
      },
    },
    data: {
      labels: ['Derecho'],
      datasets: [
        {
          data: [lenLawDer],
          hoverOffset: 4,
          backgroundColor: [
            '#a8dadc',
            '#ffe5ec',
            '#005F73',
            '#0A9396',
            '#94D2BD',
            '#E9D8A6',
            '#EE9B00',
            '#CA6702',
            '#BB3E03',
            '#AE2012',
            '#9B2226',
            '#cb997e',
          ],
          borderWidth: 0,
        },
      ],
    },
  });
})();

(async function () {
  new Chart(document.getElementById('arts-pie'), {
    type: 'pie',
    options: {
      responsive: true,
      plugins: {
        legend: {
          labels: {
            color: 'white',
          },
        },
      },
    },
    data: {
      labels: [
        'Música',
        'Comunicación Social',
        'Psicología',
        'Literatura',
        'Diseño Interactivo',
      ],
      datasets: [
        {
          data: [lenArHuMus, lenArHuCom, lenArHuPsi, lenArHuLit, lenArHuDInt],
          backgroundColor: [
            '#BB3E03',
            '#ffe5ec',
            '#CA6702',
            '#005F73',
            '#0A9396',
            '#94D2BD',
            '#E9D8A6',
            '#EE9B00',
            '#AE2012',
            '#9B2226',
            '#a8dadc',
            '#cb997e',
          ],
          borderWidth: 0,
        },
      ],
    },
  });
})();

(async function () {
  new Chart(document.getElementById('economy-pie'), {
    type: 'pie',
    options: {
      responsive: true,
      plugins: {
        legend: {
          labels: {
            color: 'white',
          },
        },
      },
    },
    data: {
      labels: ['Finanzas', 'Economía', 'Ciencias Políticas'],
      datasets: [
        {
          data: [lenEcoFin, lenEcoEco, lenEcoPol],
          hoverOffset: 4,
          backgroundColor: [
            '#cb997e',
            '#005F73',
            '#0A9396',
            '#94D2BD',
            '#E9D8A6',
            '#EE9B00',
            '#CA6702',
            '#BB3E03',
            '#AE2012',
            '#9B2226',
            '#a8dadc',
            '#ffe5ec',
          ],
          borderWidth: 0,
        },
      ],
    },
  });
})();

const monthsSecondSemester = [
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
];
const monthsFirstSemester = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
];

const weeks = ['1', '2', '3', '4'];
(async function () {
  new Chart(document.getElementById('postByDate-line'), {
    type: 'line',
    options: {
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        x: {
          title: {
            color: 'white',
            display: true,
          },
          ticks: {
            color: 'white',
          },
        },
        y: {
          min: 0,
          title: {
            color: 'white',
            display: true,
            text: 'Publicaciones',
          },
          ticks: {
            stepSize: 1,
            color: 'grey',
          },
        },
      },
    },
    data: {
      labels: monthsSecondSemester,
      datasets: [
        {
          label: 'Publicaciones',
          data: [
            lenPostsJuly,
            lenPostsAugust,
            lenPostsSeptember,
            lenPostsOctober,
            lenPostsNovember,
            lenPostsDecember,
          ],
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgb(75, 192, 192)',
          tension: 0.1,
        },
      ],
    },
  });
})();

(async function () {
  new Chart(document.getElementById('july-line'), {
    type: 'line',
    options: {
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        x: {
          title: {
            color: 'white',
            display: true,
            text: 'Semana',
          },
          ticks: {
            color: 'grey',
          },
        },
        y: {
          min: 0,
          title: {
            color: 'white',
            display: true,
            text: 'Publicaciones',
          },
          ticks: {
            stepSize: 1,
            color: 'grey',
          },
        },
      },
    },
    data: {
      labels: weeks,
      datasets: [
        {
          label: 'Publicaciones',
          data: [lenWeek1July, lenWeek2July, lenWeek3July, lenWeek4July],
          fill: false,
          borderColor: '#adc178',
          backgroundColor: '#adc178',
          tension: 0.1,
        },
      ],
    },
  });
})();

(async function () {
  new Chart(document.getElementById('august-line'), {
    type: 'line',
    options: {
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        x: {
          title: {
            color: 'white',
            display: true,
            text: 'Semana',
          },
          ticks: {
            color: 'grey',
          },
        },
        y: {
          min: 0,
          title: {
            color: 'white',
            display: true,
            text: 'Publicaciones',
          },
          ticks: {
            stepSize: 1,
            color: 'grey',
          },
        },
      },
    },
    data: {
      labels: weeks,
      datasets: [
        {
          label: 'Publicaciones',
          data: [
            lenWeek1August,
            lenWeek2August,
            lenWeek3August,
            lenWeek4August,
          ],
          fill: false,
          borderColor: '#F28482',
          backgroundColor: '#F28482',
          tension: 0.1,
        },
      ],
    },
  });
})();

(async function () {
  new Chart(document.getElementById('september-line'), {
    type: 'line',
    options: {
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        x: {
          title: {
            color: 'white',
            display: true,
            text: 'Semana',
          },
          ticks: {
            color: 'grey',
          },
        },
        y: {
          min: 0,
          title: {
            color: 'white',
            display: true,
            text: 'Publicaciones',
          },
          ticks: {
            stepSize: 1,
            color: 'grey',
          },
        },
      },
    },
    data: {
      labels: weeks,
      datasets: [
        {
          label: 'Publicaciones',
          data: [
            lenWeek1September,
            lenWeek2September,
            lenWeek3September,
            lenWeek4September,
          ],
          fill: false,
          borderColor: '#84A59D',
          backgroundColor: '#84A59D',
          tension: 0.1,
        },
      ],
    },
  });
})();

(async function () {
  new Chart(document.getElementById('october-line'), {
    type: 'line',
    options: {
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        x: {
          title: {
            color: 'white',
            display: true,
            text: 'Semana',
          },
          ticks: {
            color: 'grey',
          },
        },
        y: {
          min: 0,
          title: {
            color: 'white',
            display: true,
            text: 'Publicaciones',
          },
          ticks: {
            stepSize: 1,
            color: 'grey',
          },
        },
      },
    },
    data: {
      labels: weeks,
      datasets: [
        {
          label: 'Publicaciones',
          data: [
            lenWeek1October,
            lenWeek2October,
            lenWeek3October,
            lenWeek4October,
          ],
          fill: false,
          borderColor: '#F5CAC3',
          backgroundColor: '#F5CAC3',
          tension: 0.1,
        },
      ],
    },
  });
})();

(async function () {
  new Chart(document.getElementById('november-line'), {
    type: 'line',
    options: {
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        x: {
          title: {
            color: 'white',
            display: true,
            text: 'Semana',
          },
          ticks: {
            color: 'grey',
          },
        },
        y: {
          min: 0,
          title: {
            color: 'white',
            display: true,
            text: 'Publicaciones',
          },
          ticks: {
            stepSize: 1,
            color: 'grey',
          },
        },
      },
    },
    data: {
      labels: weeks,
      datasets: [
        {
          label: 'Publicaciones',
          data: [
            lenWeek1November,
            lenWeek2November,
            lenWeek3November,
            lenWeek4November,
          ],
          fill: false,
          borderColor: '#F7EDE2',
          backgroundColor: '#F7EDE2',
          tension: 0.1,
        },
      ],
    },
  });
})();

(async function () {
  new Chart(document.getElementById('december-line'), {
    type: 'line',
    options: {
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        x: {
          title: {
            color: 'white',
            display: true,
            text: 'Semana',
          },
          ticks: {
            color: 'grey',
          },
        },
        y: {
          min: 0,
          title: {
            color: 'white',
            display: true,
            text: 'Publicaciones',
          },
          ticks: {
            stepSize: 1,
            color: 'grey',
          },
        },
      },
    },
    data: {
      labels: weeks,
      datasets: [
        {
          label: 'Publicaciones',
          data: [
            lenWeek1December,
            lenWeek2December,
            lenWeek3December,
            lenWeek4December,
          ],
          fill: false,
          borderColor: '#F6BD60',
          backgroundColor: '#F6BD60',
          tension: 0.1,
        },
      ],
    },
  });
})();
