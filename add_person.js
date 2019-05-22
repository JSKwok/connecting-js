const process = require('process')

const settings = require("./settings"); // settings.json
const pg = require('pg');
var knex = require('knex')({
  client: 'pg',
  version: '7.2',
  connection: {
    host : '127.0.0.1',
    user : 'development',
    password : 'development',
    database : 'test_db'
  }
});

const args = process.argv;


knex.insert(
  { first_name: args[2],
    last_name: args[3],
    birthdate: args[4]
  }).into('famous_people').then(function(results) {
    knex.select().table('famous_people').then(function(result) {
      console.log(result)
    })
  }
)