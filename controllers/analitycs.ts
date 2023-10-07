import { Request, Response } from 'express';
import { Post } from '../models/post';

const getCharts = async (req: Request, res: Response) => {
  const posts = await Post.find();

  const Engineering = {
    faculty: posts.filter((post) => post.faculty === 'Ingenierias'),
    degrees: {
      mecanica: posts.filter((post) => post.degree === 'Ingeniería Mecánica'),
      procesos: posts.filter(
        (post) => post.degree === 'Ingeniería de Procesos'
      ),
      produccion: posts.filter(
        (post) => post.degree === 'Ingeniería de Producción'
      ),
      sistemas: posts.filter(
        (post) => post.degree === 'Ingeniería de Sistemas'
      ),
      agronomia: posts.filter(
        (post) => post.degree === 'Ingeniería Agronómica'
      ),
      biologia: posts.filter((post) => post.degree === 'Biología'),
      geologia: posts.filter((post) => post.degree === 'Geología'),
      matematica: posts.filter(
        (post) => post.degree === 'Ingeniería Matemática'
      ),
      fisica: posts.filter((post) => post.degree === 'Ingeniería Física'),
      civil: posts.filter((post) => post.degree === 'Ingeniería Civil'),
      IDP: posts.filter(
        (post) => post.degree === 'Ingeniería de Diseño de Producto'
      ),
      DiHu: posts.filter(
        (post) => post.degree === 'Diseño urbano y gestion habitad'
      ),
    },
  };

  const Administration = {
    faculty: posts.filter((post) => post.faculty === 'Administración'),
    degrees: {
      adminNegocios: posts.filter(
        (post) => post.degree === 'Administración de Negocios'
      ),
      negociosInter: posts.filter(
        (post) => post.degree === 'Negocios Internacionales'
      ),
      contaduria: posts.filter((post) => post.degree === 'Contaduría Pública'),
      mercadeo: posts.filter((post) => post.degree === 'Mercadeo'),
    },
  };

  const Law = {
    faculty: posts.filter((post) => post.faculty === 'Derecho'),
    degrees: {
      derecho: posts.filter((post) => post.degree === 'Derecho'),
    },
  };

  const ArtsHumanities = {
    faculty: posts.filter((post) => post.faculty === 'Artes y Humanidades'),
    degrees: {
      musica: posts.filter((post) => post.degree === 'Música'),
      comunicacion: posts.filter(
        (post) => post.degree === 'Comunicación Social'
      ),
      psicologia: posts.filter((post) => post.degree === 'Psicología'),
      literatura: posts.filter((post) => post.degree === 'Literatura'),
      dInteractivo: posts.filter(
        (post) => post.degree === 'Diseño Interactivo'
      ),
    },
  };

  const Economy = {
    faculty: posts.filter((post) => post.faculty === 'Economía'),
    degrees: {
      finanzas: posts.filter((post) => post.degree === 'Finanzas'),
      economia: posts.filter((post) => post.degree === 'Economía'),
      politica: posts.filter((post) => post.degree === 'Ciencias Políticas'),
    },
  };

  const PostsJuly = posts.filter((post) => post.createdAt.getMonth() + 1 === 7);
  const PostsAugust = posts.filter(
    (post) => post.createdAt.getMonth() + 1 === 8
  );
  const PostsSeptember = posts.filter(
    (post) => post.createdAt.getMonth() + 1 === 9
  );
  const PostsOctober = posts.filter(
    (post) => post.createdAt.getMonth() + 1 === 10
  );
  const PostsNovember = posts.filter(
    (post) => post.createdAt.getMonth() + 1 === 11
  );
  const PostsDecember = posts.filter(
    (post) => post.createdAt.getMonth() + 1 === 12
  );

  const July = {
    month: PostsJuly,
    week1: PostsJuly.filter(
      (post) => (0 | (post.createdAt.getDate() / 7)) + 1 === 1
    ),
    week2: PostsJuly.filter(
      (post) => (0 | (post.createdAt.getDate() / 7)) + 1 === 2
    ),
    week3: PostsJuly.filter(
      (post) => (0 | (post.createdAt.getDate() / 7)) + 1 === 3
    ),
    week4: PostsJuly.filter(
      (post) =>
        (0 | (post.createdAt.getDate() / 7)) + 1 === 4 ||
        (0 | (post.createdAt.getDate() / 7)) + 1 === 5
    ),
  };

  const August = {
    month: PostsAugust,
    week1: PostsAugust.filter(
      (post) => (0 | (post.createdAt.getDate() / 7)) + 1 === 1
    ),
    week2: PostsAugust.filter(
      (post) => (0 | (post.createdAt.getDate() / 7)) + 1 === 2
    ),
    week3: PostsAugust.filter(
      (post) => (0 | (post.createdAt.getDate() / 7)) + 1 === 3
    ),
    week4: PostsAugust.filter(
      (post) =>
        (0 | (post.createdAt.getDate() / 7)) + 1 === 4 ||
        (0 | (post.createdAt.getDate() / 7)) + 1 === 5
    ),
  };

  const September = {
    month: PostsSeptember,
    week1: PostsSeptember.filter(
      (post) => (0 | (post.createdAt.getDate() / 7)) + 1 === 1
    ),
    week2: PostsSeptember.filter(
      (post) => (0 | (post.createdAt.getDate() / 7)) + 1 === 2
    ),
    week3: PostsSeptember.filter(
      (post) => (0 | (post.createdAt.getDate() / 7)) + 1 === 3
    ),
    week4: PostsSeptember.filter(
      (post) =>
        (0 | (post.createdAt.getDate() / 7)) + 1 === 4 ||
        (0 | (post.createdAt.getDate() / 7)) + 1 === 5
    ),
  };

  const October = {
    month: PostsOctober,
    week1: PostsOctober.filter(
      (post) => (0 | (post.createdAt.getDate() / 7)) + 1 === 1
    ),
    week2: PostsOctober.filter(
      (post) => (0 | (post.createdAt.getDate() / 7)) + 1 === 2
    ),
    week3: PostsOctober.filter(
      (post) => (0 | (post.createdAt.getDate() / 7)) + 1 === 3
    ),
    week4: PostsOctober.filter(
      (post) =>
        (0 | (post.createdAt.getDate() / 7)) + 1 === 4 ||
        (0 | (post.createdAt.getDate() / 7)) + 1 === 5
    ),
  };

  const November = {
    month: PostsNovember,
    week1: PostsNovember.filter(
      (post) => (0 | (post.createdAt.getDate() / 7)) + 1 === 1
    ),
    week2: PostsNovember.filter(
      (post) => (0 | (post.createdAt.getDate() / 7)) + 1 === 2
    ),
    week3: PostsNovember.filter(
      (post) => (0 | (post.createdAt.getDate() / 7)) + 1 === 3
    ),
    week4: PostsNovember.filter(
      (post) =>
        (0 | (post.createdAt.getDate() / 7)) + 1 === 4 ||
        (0 | (post.createdAt.getDate() / 7)) + 1 === 5
    ),
  };

  const December = {
    month: PostsDecember,
    week1: PostsDecember.filter(
      (post) => (0 | (post.createdAt.getDate() / 7)) + 1 === 1
    ),
    week2: PostsDecember.filter(
      (post) => (0 | (post.createdAt.getDate() / 7)) + 1 === 2
    ),
    week3: PostsDecember.filter(
      (post) => (0 | (post.createdAt.getDate() / 7)) + 1 === 3
    ),
    week4: PostsDecember.filter(
      (post) =>
        (0 | (post.createdAt.getDate() / 7)) + 1 === 4 ||
        (0 | (post.createdAt.getDate() / 7)) + 1 === 5
    ),
  };

  res.render('analytics/charts', {
    Engineering,
    Administration,
    Law,
    ArtsHumanities,
    Economy,
    July,
    August,
    September,
    October,
    November,
    December,
  });
};

const getChartsByMonths = async (req: Request, res: Response) => {
  const posts = await Post.find();

  const PostsJuly = posts.filter((post) => post.createdAt.getMonth() + 1 === 7);
  const PostsAugust = posts.filter(
    (post) => post.createdAt.getMonth() + 1 === 8
  );
  const PostsSeptember = posts.filter(
    (post) => post.createdAt.getMonth() + 1 === 9
  );
  const PostsOctober = posts.filter(
    (post) => post.createdAt.getMonth() + 1 === 10
  );
  const PostsNovember = posts.filter(
    (post) => post.createdAt.getMonth() + 1 === 11
  );
  const PostsDecember = posts.filter(
    (post) => post.createdAt.getMonth() + 1 === 12
  );

  const July = {
    month: PostsJuly,
    week1: PostsJuly.filter(
      (post) => (0 | (post.createdAt.getDate() / 7)) + 1 === 1
    ),
    week2: PostsJuly.filter(
      (post) => (0 | (post.createdAt.getDate() / 7)) + 1 === 2
    ),
    week3: PostsJuly.filter(
      (post) => (0 | (post.createdAt.getDate() / 7)) + 1 === 3
    ),
    week4: PostsJuly.filter(
      (post) =>
        (0 | (post.createdAt.getDate() / 7)) + 1 === 4 ||
        (0 | (post.createdAt.getDate() / 7)) + 1 === 5
    ),
  };

  const August = {
    month: PostsAugust,
    week1: PostsAugust.filter(
      (post) => (0 | (post.createdAt.getDate() / 7)) + 1 === 1
    ),
    week2: PostsAugust.filter(
      (post) => (0 | (post.createdAt.getDate() / 7)) + 1 === 2
    ),
    week3: PostsAugust.filter(
      (post) => (0 | (post.createdAt.getDate() / 7)) + 1 === 3
    ),
    week4: PostsAugust.filter(
      (post) =>
        (0 | (post.createdAt.getDate() / 7)) + 1 === 4 ||
        (0 | (post.createdAt.getDate() / 7)) + 1 === 5
    ),
  };

  const September = {
    month: PostsSeptember,
    week1: PostsSeptember.filter(
      (post) => (0 | (post.createdAt.getDate() / 7)) + 1 === 1
    ),
    week2: PostsSeptember.filter(
      (post) => (0 | (post.createdAt.getDate() / 7)) + 1 === 2
    ),
    week3: PostsSeptember.filter(
      (post) => (0 | (post.createdAt.getDate() / 7)) + 1 === 3
    ),
    week4: PostsSeptember.filter(
      (post) =>
        (0 | (post.createdAt.getDate() / 7)) + 1 === 4 ||
        (0 | (post.createdAt.getDate() / 7)) + 1 === 5
    ),
  };

  const October = {
    month: PostsOctober,
    week1: PostsOctober.filter(
      (post) => (0 | (post.createdAt.getDate() / 7)) + 1 === 1
    ),
    week2: PostsOctober.filter(
      (post) => (0 | (post.createdAt.getDate() / 7)) + 1 === 2
    ),
    week3: PostsOctober.filter(
      (post) => (0 | (post.createdAt.getDate() / 7)) + 1 === 3
    ),
    week4: PostsOctober.filter(
      (post) =>
        (0 | (post.createdAt.getDate() / 7)) + 1 === 4 ||
        (0 | (post.createdAt.getDate() / 7)) + 1 === 5
    ),
  };

  const November = {
    month: PostsNovember,
    week1: PostsNovember.filter(
      (post) => (0 | (post.createdAt.getDate() / 7)) + 1 === 1
    ),
    week2: PostsNovember.filter(
      (post) => (0 | (post.createdAt.getDate() / 7)) + 1 === 2
    ),
    week3: PostsNovember.filter(
      (post) => (0 | (post.createdAt.getDate() / 7)) + 1 === 3
    ),
    week4: PostsNovember.filter(
      (post) =>
        (0 | (post.createdAt.getDate() / 7)) + 1 === 4 ||
        (0 | (post.createdAt.getDate() / 7)) + 1 === 5
    ),
  };

  const December = {
    month: PostsDecember,
    week1: PostsDecember.filter(
      (post) => (0 | (post.createdAt.getDate() / 7)) + 1 === 1
    ),
    week2: PostsDecember.filter(
      (post) => (0 | (post.createdAt.getDate() / 7)) + 1 === 2
    ),
    week3: PostsDecember.filter(
      (post) => (0 | (post.createdAt.getDate() / 7)) + 1 === 3
    ),
    week4: PostsDecember.filter(
      (post) =>
        (0 | (post.createdAt.getDate() / 7)) + 1 === 4 ||
        (0 | (post.createdAt.getDate() / 7)) + 1 === 5
    ),
  };
  res.render('analytics/chartsDates', {
    July,
    August,
    September,
    October,
    November,
    December,
  });
};

export const chartControllers = {
  getCharts,
  getChartsByMonths,
};
