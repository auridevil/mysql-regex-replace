# mysql-regex-replace

boilerplate code for data replacement in mysql

## start

```
yarn start
```

## setup

create a .env file with

```

MYSQL_USER=
MYSQL_PWD=
MYSQL_PORT=
MYSQL_DB=
MYSQL_HOST=

```

define in index.mjs the functions

```

selectQuery() // the fetch query
updateRowQuery(id, updatedFieldData) // the update query
replaceText(dataRow) // the single row transform data, return updatedFieldData
getRowId(dataRow) // return the unique identifier of the row, for the update usage

```

## licensing and use

free to use, see ya at zabriskie point

```

```
