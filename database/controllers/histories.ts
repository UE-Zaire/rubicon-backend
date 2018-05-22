import knex from '../database';
import { addUser } from './users';
import fs from 'fs';

interface IHistory {
  history: string,
  nodes: Array<{ url: string, title: string }>,
  links: Array<{ source: string, target: string }>
}

const saveHistory = async (req: any, res: any) => {
  const { history, nodes } = req.body;
  const id = req.session ? (req.session.id ? req.session.id : req.session.passport.user.profile.id) : "0";

  const userId = await knex('users').select('id').where({ email_id: id });
  const historyInfo = { name: history, user: userId[0].id };
  var historyId = await knex('histories').select('id').where(historyInfo);
  
  if (!historyId.length) {
    await knex('histories').insert({ name: history, nodes: nodes, user: userId[0].id });
    historyId = await knex('histories').select('id').where(historyInfo);
  } 

  res.send('saved');
};

const getHistories = async (req: any, res: any) => {
  const id = req.session ? (req.session.id ? req.session.id : req.session.passport.user.profile.id) : "0";
  const userId = await knex('users').select().where({ email_id: id });
  const histories = await knex('histories').select().where({ user: userId[0].id });
  
  res.send(histories);
}

const getHistory = async (req: any, res: any) => {
  const { query } = req.query;
  const userId = await knex('users').select('id').where({ email_id: req.session.id });
  const history = await knex('histories').select().where({ user: userId[0].id, name: query });

  res.send(history[0].nodes);
}

const deleteHistory = async (req: any, res: any) => {

}

const patchHistory = async (req: any, res: any) => {

}

export {
  saveHistory, 
  getHistories,
  getHistory,
  deleteHistory,
  patchHistory
}