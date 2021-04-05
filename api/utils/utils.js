import { readFileSync, writeFileSync } from "fs";

/**
 * Read content of json file
 * @param  {string} file Name of file
 */
 const loadData = (file) =>
 JSON.parse(readFileSync(`api/data/${file}.json`).toString("utf8"));


 export {loadData}