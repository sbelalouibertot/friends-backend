const { readFileSync, writeFileSync } = require("fs");

/**
 * Read content of json file
 * @param  {string} file Name of file
 */
const loadData = (file) =>
  JSON.parse(readFileSync(`api/data/${file}.json`).toString("utf8"));

/**
 * Write new content of json file
 * @param  {string} file
 * @param  {object} data
 */
const writeData = (file, data) =>
  writeFileSync(`api/data/${file}.json`, JSON.stringify(data, null, 4));

module.exports.loadData = loadData
module.exports.writeData = writeData