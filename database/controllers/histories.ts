import knex from '../database';

interface IHistory {
  history: string,
  nodes: Array<{ url: string, title: string }>,
  links: Array<{ source: string, target: string }>
}

const saveHistory = async (req: any, res: any) => {
  const { history, nodes, links } = req.body;
  const userId = await knex('users').select('id').where({ email: req.session.id });
  const historyInfo = { name: history, user: userId[0].id };
  var historyId = await knex('histories').select('id').where(historyInfo);
  
  if (!historyId.length) {
    await knex('histories').insert(historyInfo);
    historyId = await knex('histories').select('id').where(historyInfo);
  } 

  nodes.forEach(async (node: any) => {
    const nodeRecord = await knex('nodes').select().where({ url: node.url, history: historyId[0].id });

    if (!nodeRecord.length) {
      await knex('nodes').insert({ url: node.url, title: node.title, history: historyId[0].id });
    }
  })

  links.forEach(async (link: any) => {
    const linkInfo = { source: link.source, target: link.target, history: historyId[0].id };
    const linkRecord = await knex('links').select().where(linkInfo);

    if (!linkRecord.length) {
      await knex('links').insert(linkInfo);
    }
  })
};

const getHistories = async (req: any, res: any) => {
  const { id } = req.session;
  const userId = await knex('users').select().where({ email: id });
  const histories = await knex('histories').select().where({ user: userId[0].id });
  const history: IHistory[] = [];

  histories.forEach((hist: any) => {
    const currHist: IHistory = { history: hist.name, nodes: [], links: [] };
    history.push(currHist);
  })
  console.log(histories);
  res.send(histories);
}

export {
  saveHistory, 
  getHistories
}