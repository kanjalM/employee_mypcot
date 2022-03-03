const mysql = require("mysql2");

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "mypcot12345678@",
    database: "employee_data"
});

export const addDepartment = async (req, res) => {

    const dept_name = req.body.dept_name;

    const deptInsert = "INSERT INTO dept_details (dept_name) VALUES ?";
    const values = [[dept_name]];

    let addDept = db.query(deptInsert, [values], (error, results) => {
        if (error) {
            console.log('Failed to Add Department ', error);
            res.sendStatus(500)
            return;
        }
    });

    return res.status(200).json({
        data: [addDept.values[0]],
        message: 'Department Added Successfully',
        status: true
    });
};

export const listDepartment = async (req, res) => {

    const list_dept = "SELECT * FROM dept_details";

    db.query(list_dept, (error, results) => {
        if(error){
            console.log('Failed to List Department ', error);
            res.sendStatus(500)
            return;
        }
        res.send(results)
    });

};