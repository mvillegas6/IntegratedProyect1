console.log(lenIngMate);

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
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        x: {
          title: {
            color: 'red',
            display: true,
            text: 'Escuelas',
          },
        },
        y: {
          title: {
            color: 'red',
            display: true,
            text: 'Publicaciones',
          },
          ticks: {
            stepSize: 1, // No existe 0.5 post
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
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
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
    type: 'polarArea',
    options: {
      scales: {
        r: {
          ticks: {
            stepSize: 1,
          },
          grid: {
            color: 'red', // Color de las lineas
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
          labels: 'Ingeniería Mecánica',
          data: [lenIngMec, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          hoverOffset: 4,
          // backgroundColor: [] //TODO poner paleta de colores
        },
        {
          labels: 'Ingeniería de Procesos',
          data: [0, lenIngPro, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          hoverOffset: 4,
        },
        {
          labels: 'Ingeniería de Producción',
          data: [0, 0, lenIngProdu, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          hoverOffset: 4,
        },
        {
          labels: 'Ingeniería de Sistemas',
          data: [0, 0, 0, lenIngSis, 0, 0, 0, 0, 0, 0, 0, 0],
          hoverOffset: 4,
        },
        {
          labels: 'Ingeniería Agronómica',
          data: [0, 0, 0, 0, lenIngAgro, 0, 0, 0, 0, 0, 0, 0],
          hoverOffset: 4,
        },
        {
          labels: 'Biología',
          data: [0, 0, 0, 0, 0, lenIngBio, 0, 0, 0, 0, 0, 0],
          hoverOffset: 4,
        },
        {
          labels: 'Geología',
          data: [0, 0, 0, 0, 0, 0, lenIngGeo, 0, 0, 0, 0, 0],
          hoverOffset: 4,
        },
        {
          labels: 'Ingeniería Matemática',
          data: [0, 0, 0, 0, 0, 0, 0, lenIngMate, 0, 0, 0, 0],
          hoverOffset: 4,
        },
        {
          labels: 'Ingeniería Física',
          data: [0, 0, 0, 0, 0, 0, 0, 0, lenIngFis, 0, 0, 0],
          hoverOffset: 4,
        },
        {
          labels: 'Ingeniería Civil',
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, lenIngCiv, 0, 0],
          hoverOffset: 4,
        },
        {
          labels: 'Ingeniería de Diseño de Producto',
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, lenIngIDP, 0],
          hoverOffset: 4,
        },
        {
          labels: 'Diseño urbano y gestion habitad',
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, lenIngDiHu],
          hoverOffset: 4,
        },
      ],
    },
  });
})();

(async function () {
  new Chart(document.getElementById('administration-pie'), {
    type: 'polarArea',
    options: {
      scales: {
        r: {
          ticks: {
            stepSize: 1,
          },
          grid: {
            color: 'red', // Color de las lineas
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
          labels: 'Administración de Negocios',
          data: [lenAdmNeg, 0, 0, 0],
          hoverOffset: 4,
        },
        {
          labels: 'Negocios Internacionales',
          data: [0, lenAdmInt, 0, 0],
          hoverOffset: 4,
        },
        {
          labels: 'Contaduría Pública',
          data: [0, 0, lenAdmCon, 0],
          hoverOffset: 4,
        },
        {
          labels: 'Mercadeo',
          data: [0, 0, 0, lenAdmMer],
          hoverOffset: 4,
        },
      ],
    },
  });
})();

(async function () {
  new Chart(document.getElementById('law-pie'), {
    type: 'polarArea',
    options: {
      scales: {
        r: {
          ticks: {
            stepSize: 1,
          },
          grid: {
            color: 'red', // Color de las lineas
          },
        },
      },
    },
    data: {
      labels: ['Derecho'],
      datasets: [
        {
          labels: 'Derecho',
          data: [lenLawDer],
          hoverOffset: 4,
        },
      ],
    },
  });
})();

(async function () {
  new Chart(document.getElementById('arts-pie'), {
    type: 'polarArea',
    options: {
      scales: {
        r: {
          ticks: {
            stepSize: 1,
          },
          grid: {
            color: 'red', // Color de las lineas
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
          labels: 'Música',
          data: [lenArHuMus, 0, 0, 0, 0],
          hoverOffset: 4,
        },
        {
          labels: 'Comunicación Social',
          data: [0, lenArHuCom, 0, 0, 0],
          hoverOffset: 4,
        },
        {
          labels: 'Psicología',
          data: [0, 0, lenArHuPsi, 0, 0],
          hoverOffset: 4,
        },
        {
          labels: 'Literatura',
          data: [0, 0, 0, lenArHuLit, 0],
          hoverOffset: 4,
        },
        {
          labels: 'Diseño Interactivo',
          data: [0, 0, 0, 0, lenArHuDInt],
          hoverOffset: 4,
        },
      ],
    },
  });
})();

(async function () {
  new Chart(document.getElementById('economy-pie'), {
    type: 'polarArea',
    options: {
      scales: {
        r: {
          ticks: {
            stepSize: 1,
          },
          grid: {
            color: 'red', // Color de las lineas
          },
        },
      },
    },
    data: {
      labels: ['Finanzas', 'Economía', 'Ciencias Políticas'],
      datasets: [
        {
          labels: 'Finanzas',
          data: [lenEcoFin, 0, 0],
          hoverOffset: 4,
        },
        {
          labels: 'Economía',
          data: [0, lenEcoEco, 0],
          hoverOffset: 4,
        },
        {
          labels: 'Ciencias Políticas',
          data: [0, 0, lenEcoPol],
          hoverOffset: 4,
        },
      ],
    },
  });
})();
