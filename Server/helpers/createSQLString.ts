
export function createSQLinsert(tableName: string, columnsName: string[], entries: string[]): string {
    let columns = ``
    columnsName.forEach(element => {
        columns += element;
        columns += ',';
    });
    let values = '';
    entries.forEach(element => {
        values += `'${element}'`;
        values += ',';
    });
    columns = columns.slice(0, -1);
    values = values.slice(0, -1);

    let SQL = `INSRT INTO ${tableName} (${columns}) VALUES (${values});`;
    return SQL;
}

export function createSQLupdate(tableName: string, columnName: string, entry: string, filterColumn: string, filterValue: string): string {


    let SQL = `UPDATE ${tableName} SET ${columnName}='${entry}' WHERE ${filterColumn} = '${filterValue}' RETURNING *`;
    return SQL;
}

export function createSQLdelete(tableName: string, filterColumn: string, filterValue: string): string {
    let SQL = `DELETE FROM ${tableName} WHERE ${filterColumn} = ${filterValue} RETURNING *`;
    return SQL;
}

// if you want all columns enter '*' instead of columnsNeeded
// if you want columns name to be changes enter the required values in order as optional argument asColumnName
// But if you used optinal argument asColumnName, number of columns in both arguments must be equal
export function createSQLshowAll(tableName: string, columnsNeeded: string[], asColumnsName?: string[]): string {
    let columns = ``;
    let SQL = ``;
    if (asColumnsName) {
        let i = 0
        columnsNeeded.forEach(element => {
            columns += element + ' AS ';
            columns += asColumnsName[i];
            i++;
            columns += ',';
        });
        columns = columns.slice(0, -1);
        SQL = `SELECT ${columns} FROM ${tableName}`

    } else {
        columnsNeeded.forEach(element => {
            columns += element;
            columns += ',';
        });
        columns = columns.slice(0, -1);
        SQL = `SELECT ${columns} FROM ${tableName}`;
    }
    return SQL;
};

// if you want all columns enter '*' instead of columnsNeeded
// if you want columns name to be changes enter the required values in order as optional argument asColumnName
// But if you used optinal argument asColumnName, number of columns in both arguments must be equal
export function createSQLshowOneOnly(tableName: string, filterColumn: string, filterValue: string, columnsNeeded: string[], asColumnsName?: string[]): string {
    let columns = ``;
    let SQL = ``;
    if (asColumnsName) {
        let i = 0
        columnsNeeded.forEach(element => {
            columns += element + ' AS ';
            columns += asColumnsName[i];
            i++;
            columns += ',';
        });
        columns = columns.slice(0, -1);
        SQL = `SELECT ${columns} FROM ${tableName}`

    } else {
        columnsNeeded.forEach(element => {
            columns += element;
            columns += ',';
        });
        columns = columns.slice(0, -1);
        SQL = `SELECT ${columns} FROM ${tableName}`;
    }
    SQL += ` WHERE ${filterColumn}=${filterValue};`
    return SQL;
};
