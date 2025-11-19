window.jokesAndQuotes = [];

export async function initDatabase() {
    try {
        const SQL = await initSqlJs({ locateFile: file => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/${file}` });

        const response = await fetch("./SQLiteBase/jokesQuotes.sqlite");
        if (!response.ok) throw new Error("Не удалось загрузить базу");
        const buffer = await response.arrayBuffer();

        const db = new SQL.Database(new Uint8Array(buffer));

        const res = db.exec("SELECT * FROM jokes_quotes");
        const values = [];

        if (res.length > 0) {
            const columns = res[0].columns;
            const rows = res[0].values;

            rows.forEach(row => {
                const obj = {};
                row.forEach((value, index) => {
                    obj[columns[index]] = value;
                });
                values.push(obj);
            });
        }

        window.jokesAndQuotes = values;
        console.log("База загружена:", window.jokesAndQuotes);

    } catch (error) {
        console.error("Ошибка при инициализации базы:", error);
    }
}

export function getRandomEntry(filter = "all") {
    let data = window.jokesAndQuotes;

    if (filter === "joke") {
        data = data.filter(item => item.type === "joke");
    } else if (filter === "quote") {
        data = data.filter(item => item.type === "quote");
    }

    if (data.length === 0) return null;

    const randomIndex = Math.floor(Math.random() * data.length);
    return data[randomIndex];
}
