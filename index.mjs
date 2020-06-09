import bluebird from "bluebird";
import { escape, getConnection } from "./mysql.mjs";

const { map } = bluebird;

const SPACE = " ";

/** Variable code */
const replaceText = (dataRow) => {
  const { XML: originalXml } = dataRow;
  const replace = (xml) => {
    const worked = xml.replace(/src=\"[^\"]* align=[a-z]+\"/, (value) => {
      const block = value.split(SPACE);
      const { length } = block;
      return `${
        block.length > 2 ? block.slice(0, length - 1).join(SPACE) : block[0]
      }"`;
    });
    if (worked === xml) {
      return worked;
    } else {
      return replace(worked);
    }
  };
  return replace(originalXml);
};

const getRowId = (dataRow) => dataRow.ID;
const selectQuery = () => process.env.SELECT_QUERY;
const updateRowQuery = (id, updated) =>
  `UPDATE zte.ZTE_ESERCIZI set xml =${escape(updated)} WHERE ID=${id}`;

/** Stable code - don't touch */
const replace = async () => {
  const connection = await getConnection();
  console.log("started, fetching data");
  const data = await connection.query(selectQuery());
  console.log("query complete ", data.length);
  await map(data, async (row) => {
    const updated = replaceText(row);
    const id = getRowId(row);
    await connection.query(updateRowQuery(id, updated));
    console.log("updated ", id);
  });
  console.log("completed");
  process.exit(0);
};

replace();
