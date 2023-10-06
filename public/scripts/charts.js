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

const weeks = ['Julio', 'Agosto', 'Septiembre', 'Octubere', 'Noviembre'];

(async function () {
  new Chart(document.getElementById('postByDate-line'), {
    type: 'line',
    options: {
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
          data: [65, 59, 80, 81, 56],
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgb(75, 192, 192)',
          tension: 0.1,
        },
      ],
    },
  });
})();
