import bluebird from "bluebird";
import { escape, getConnection } from "./mysql.mjs";

const { map } = bluebird;

const replaceText = (dataRow) => {
  const { XML: xml } = dataRow;
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  return numbers.reduce((acc, num) => {
    return acc.split(`id="${num}`).join(`id="_${num}`);
  }, xml);
};

const getRowId = (dataRow) => dataRow.ID;
const selectQuery = process.env.SELECT_QUERY;
const updateRowQuery = (id, updated) =>
  `UPDATE zte.ZTE_ESERCIZI set XML ="${escape(updated)}" WHERE ID=${id}`;

const replace = async () => {
  const connection = await getConnection();
  console.log("query", selectQuery);
  const data = await connection.query(selectQuery);
  console.log("query complete ", data.length);
  await map(data, async (row) => {
    const updated = replaceText(row);
    const id = getRowId(row);
    await connection.query(updateRowQuery(id, updated));
    console.log("updated ", id);
  });
  return console.log("completed");
};

replace();
