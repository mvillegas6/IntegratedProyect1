import { Post } from '../models/post';
import { Request, Response } from 'express';
import { Faculties } from '../util/degrees';

async function filterByQuery(req: Request, res: Response) {
  let posts: any;
  let keyword;
  if (req.query.q) {
    keyword = `${req.query.q}`;
    posts = (
      await Post.find({
        title: { $regex: new RegExp(keyword, 'i') },
      })
        .populate('author')
        .populate('votes')
    ).reverse();
  } else if (req.query.faculty) {
    keyword = req.query.faculty;
    posts = (
      await Post.find({
        faculty: req.query.faculty,
      })
        .populate('author')
        .populate('votes')
    ).reverse();
  } else if (req.query.degree) {
    keyword = req.query.degree;
    posts = (
      await Post.find({
        degree: req.query.degree,
      })
        .populate('author')
        .populate('votes')
    ).reverse();
  } else {
    keyword = '';
    posts = (
      await Post.find({}).populate('author').populate('votes')
    ).reverse();
  }
  res.render('Posts/show', { posts, keyword, m: req.flash('success') });
}

function findFaculty(post: any) {
  if (Faculties.ingeneers.includes(post.degree)) {
    post.faculty = 'Ingenierias';
  } else if (Faculties.administration.includes(post.degree)) {
    post.faculty = 'Administración';
  } else if (Faculties.law.includes(post.degree)) {
    post.faculty = 'Derecho';
  } else if (Faculties.artsAndHumanities.includes(post.degree)) {
    post.faculty = 'Artes y Humanidades';
  } else if (Faculties.economy.includes(post.degree)) {
    post.faculty = 'Economía';
  } else {
    post.faculty = '';
  }
}

function checkUserLike(req: Request, post: any) {
  let flag = false;
  for (let index = 0; index < post.votes.length; index++) {
    const element = post.votes[index];
    console.log(element['email']);
    if (element['email'] === req.user['email']) {
      console.log('Ya le diste like');
      flag = true;
    }
  }
  return flag;
}

function removeUserLike(req: Request, post: any) {
  let flag = false;
  for (let index = 0; index < post.votes.length; index++) {
    const element = post.votes[index];
    console.log(element['email']);
    if (element['email'] === req.user['email']) {
      const oldLike = post.votes.splice(index, 1);
      console.log(`El like de ${oldLike} ha sido eliminado`);
      flag = true;
    }
  }
  return flag;
}

export const Helpers = {
  filterByQuery,
  findFaculty,
  checkUserLike,
  removeUserLike,
};
