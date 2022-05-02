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
    let SQL = `INSERT INTO ${tableName} (${columns}) VALUES (${values}) RETURNING *;`;
    return SQL;
}

export function createSQLupdate(tableName: string, columnsName: string[], entries: string[], filterColumn: string, filterValue: string): string {
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
    let SQL: string = ''
    if (columnsName.length === 1) {
        SQL = `UPDATE ${tableName} SET ${columnsName}=${values} WHERE ${filterColumn} = '${filterValue}' RETURNING *`;
    } else {
        SQL = `UPDATE ${tableName} SET (${columnsName})=(${values}) WHERE ${filterColumn} = '${filterValue}' RETURNING *`;
    }
    return SQL;
}

export function createSQLdelete(tableName: string, filterColumn: string, filterValue: string): string {
    let SQL = `DELETE FROM ${tableName} WHERE ${filterColumn} = '${filterValue}' RETURNING *`;
    return SQL;
}

// if you want all columns enter '*' instead of columnsNeeded
// if you want to add filter, add array [filterColumn, filterValue] to optional param filter
// if you want columns name to be changes enter the required values in order as optional argument asColumnName
// But if you used optinal argument asColumnName, number of columns in both arguments must be equal
export function createSQLshowAll(tableName: string, columnsNeeded: string[], filter?: string[], asColumnsName?: string[]): string {
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
    if (typeof filter !== 'undefined') {
        SQL += ` WHERE ${filter[0]}= '${filter[1]}'`
    }
    return SQL;
};

// if you want all columns enter '*' instead of columnsNeeded
// if you want columns name to be changes enter the required values in order as optional argument asColumnName
// But if you used optinal argument asColumnName, number of columns in both arguments must be equal
export function createSQLshowOneOnly(tableName: string, filterColumn: string, filterValue: string, columnsNeeded: string[], orderBy: string, asColumnsName?: string[]): string {
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
    SQL += ` WHERE ${filterColumn}='${filterValue}' `
    if (tableName === 'patients_personal' || tableName === 'clinical_data' || tableName === 'patients_visits' || tableName === 'users') {
        SQL += `LIMIT 1;`;
    } else {
        SQL += `ORDER BY ${orderBy} DESC LIMIT 1;`;
    }
    return SQL;
};
