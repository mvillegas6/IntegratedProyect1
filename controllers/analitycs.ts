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
    }
  }

  res.render('analytics/charts', {
    Engineering,
    Administration,
    Law,
    ArtsHumanities,
    Economy,
  });
};

export const chartControllers = {
  getCharts,
};
