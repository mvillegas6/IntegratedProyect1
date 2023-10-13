import { Post } from '../models/post';
import { Group } from '../models/groups';
import { Request, Response } from 'express';
import { Faculties } from '../util/degrees';

async function filterByQuery(req: Request, res: Response) {
  let posts: any;
  let keyword;
  const groups = await Group.find();
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
    posts = (await Post.find({}).populate('author').populate('votes')).reverse();
  }
  res.render('Posts/show', { posts, keyword, m: req.flash('success'), groups });
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
  if (post.votes.length !== 0 && req.session['currentUser']) {
    for (let index = 0; index < post.votes.length; index++) {
      const element = post.votes[index];
      if (element['email'] === req.session['currentUser']['email']) {
        flag = true;
      }
    }
  }
  return flag;
}

function removeUserLike(req: Request, post: any, user: any) {
  let flag = false;
  let oldPost: any;
  if (post.votes.length !== 0 && req.session['currentUser']) {
    for (let index = 0; index < post.votes.length; index++) {
      const element = post.votes[index];
      if (element['_id'].valueOf() === req.session['currentUser']['_id'].valueOf()) {
        const oldLike = post.votes.splice(index, 1);
        flag = true;
      }
    }
    const userLikes = user.likes;
    for (let index = 0; index < userLikes.length; index++) {
      const element = userLikes[index];
      if (element['_id'].valueOf() === post['_id'].valueOf()) {
        const oldLike = userLikes.splice(index, 1);
        flag = true;
      }
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
