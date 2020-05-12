import bluebird from "bluebird";
import { escape, getConnection } from "./mysql.mjs";

const { map } = bluebird;

/** Variable code */
const replaceText = (dataRow) => /* replace me */ dataRow.field.toUpperCase();
const getRowId = (dataRow) => /* replace me */ dataRow.id;
const selectQuery = () => /* replace me */ process.env.SELECT_QUERY;
const updateRowQuery = (id, updated) =>
  /* replace me */ `UPDATE table set field ="${escape(
    updated,
  )}" WHERE id=${id}`;

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
