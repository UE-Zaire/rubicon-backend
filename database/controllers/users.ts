import knex from '../database';

const addUser = async (id: string, displayName: string) => {  
  await knex('users').insert({ user_name: displayName, email_id: id });
};

const login = async (token: any, refreshToken: any, profile: any, done: any) => {
  const { id, displayName } = profile;  
  const checkUser = await knex('users').select().where({ user_name: displayName, email_id: id || 0 });

  if (!checkUser.length) {
    addUser(id, displayName);
  }

  return done(null, {
    profile: profile,
    token: token
  });
};

export {
  login,
  addUser
}