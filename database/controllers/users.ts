import knex from '../database';

const addUser = async (req: any, res: any) => {
  const { username, email } = req.body;
  const checkUser = await knex('users').select().where({ user_name: username, email });
  
  if (!checkUser.length) {
    await knex('users').insert({ user_name: username, email });
    res.send('added');
  } else {
    res.send('already a user');
  }
};

const login = async (req: any, res: any) => {
  const { username, email } = req.body;
  const checkUser = await knex('users').select().where({ user_name: username, email });

  if (checkUser.length) {
    res.send('valid user');
  } else {
    res.send('invalid credentials');
  }
};

export {
  login,
  addUser
}