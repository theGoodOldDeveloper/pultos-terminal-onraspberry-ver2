try {
    insertMySQL();
    console.log("try OK **********");
} catch (e) {
    console.log({ name: e.name, message: e.message });
    console.log("catch OK **********");
}
console.log("try-catch OK ********** átjutottunk😎😎😎");
alert("try-catch vizsgálata!!!");
async function insertMySQL() {}

/* INFO: TODO: INFO: TODO: INFO: */
con.query(
    "INSERT INTO csoportok (nev) VALUES (?)",
    [insertData],
    (err, data) => {
        try {
            res.send(data);
        } catch {
            if (err) throw err;
        }
    }
);
/* con.query(
    "INSERT INTO csoportok (nev) VALUES (?)",
    [insertData],
    (err, data) => {
        if (err) throw err;
        res.send(data);
    }
); */
/* INFO: TODO: INFO: TODO: INFO: */
