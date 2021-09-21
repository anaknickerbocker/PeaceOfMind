import express from 'express';
// import UsersService from '../services/UsersService';
import r from 'rethinkdb';

const users = express.Router();

users.get('/', (req, res) => {
  const dataService = req.app.get('dataService');
  r.table('users').run(dataService.connection, function (err, cursor) {
    if (err) throw err;
    cursor.toArray((err, result) => {
      if (err) throw err;
      return res.json(result);
    });
  });
});

users.post('/', (req, res) => {
  const dataService = req.app.get('dataService');
  r.table('users')
    .insert({
      name: req.body?.name,
      smsPhoneNumber: req.body?.smsPhoneNumber || '',
      voicePhoneNumber: req.body?.voicePhoneNumber || '',
      email: req.body?.email || '',
    })
    .run(dataService.connection, (err, result) => {
      if (err) throw err;
      return res.json(result);
    });
});

export default users;
