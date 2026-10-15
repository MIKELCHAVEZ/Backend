import pool from '../config/db.js';

//read
export const fetchAllBooks = async () =>{
    const [rows] = await pool.query("SELECT * FROM book");
    return rows;
};


//insert
export const insert = async (book) =>{
    const [result] = await pool.query(
        "INSERT INTO book(name,author) VALUES (?,?)",
        [book.name, book.author]
    );
}

//Update
    export const update = async (book) => {
        const [result] = await pool.query (
            "UPDATE book SET name= ?, author=? WHERE id=?",
            [book.name, book.author, book.id]
        );
        
    return result.affectedRows;
}
 