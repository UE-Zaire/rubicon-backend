import knex from '../database';

const saveHistory = async (req: any, res: any) => {
  const { history, username, nodes, links } = req.body;
  const userId = await knex('users').select('id').where({ user_name: username });
  var historyId = await knex('histories').select('id').where({ name: history, user: userId[0].id });
  
  if (!historyId.length) {
    await knex('histories').insert({ name: history, user: userId[0].id });
    historyId = await knex('histories').select('id').where({ name: history, user: userId[0].id });
  } 

  nodes.forEach(async (node: any) => {
    const nodeRecord = await knex('nodes').select().where({ url: node.url, history: historyId[0].id });

    if (!nodeRecord.length) {
      await knex('nodes').insert({ url: node.url, title: node.title, history: historyId[0].id });
    }
  })

  links.forEach(async (link: any) => {
    const linkRecord = await knex('links').select().where({ source: link.source, target: link.target, history: historyId[0].id });

    if (!linkRecord.length) {
      await knex('links').insert({ source: link.source, target: link.target, history: historyId[0].id });
    }
  })
};

const getHistories = async (req: any, res: any) => {
  const { username, email } = req.body;
  const userId = await knex('users').select().where({ user_name: username. email });
  const histories = await knex('histories').select().where({ user: userId[0].id });

  res.send(histories);
}

export {
  saveHistory, 
  getHistories
}