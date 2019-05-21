const process = require('process')
const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

const name = process.argv[2];

function getPersonByName(name, callback) {
  client.query("SELECT * FROM famous_people WHERE first_name = $1::text", [name], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    callback(result)
  });
}

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }

  console.log("Searching ...")

  getPersonByName(name, function (result) {
    console.log(`Found ${result.rows.length} person(s) by the name ${name}:`)
    for (let i = 0; i < result.rows.length; i++) {
      console.log(`- ${i + 1}: ${result.rows[i].first_name} ${result.rows[i].last_name}, born ${(result.rows[i].birthdate)}`)
    }
    client.end();
  })
});