const mysql = require("mysql2");

const db = mysql.createPool({

    host: "localhost",
    user: "root",
    password: "mypcot12345678@",
    database: "employee_data"
});

export const addDesignation = async (req, res) => {

    const dept_id = req.body.dept_id;
    const desig_name = req.body.desig_name;

    const desigInsert = "INSERT INTO desig_details (dept_id, desig_name) VALUES ?";
    const values = [[dept_id, desig_name]];

    let addDesig = db.query(desigInsert, [values], (error, results) => {
        if (error) {
            console.log('Failed to Add Department ', error);
            res.sendStatus(500)
            return;
        }
    });

    return res.status(200).json({
        data: [addDesig.values[0]],
        message: 'Designation Added Successfully',
        status: true
    });
};

export const listDesignation = async (req, res) => {

    const list_desig = "SELECT * FROM desig_details";

    db.query(list_desig, (error, results) => {
        if(error){
            console.log('Failed to List Department ', error);
            res.sendStatus(500)
            return;
        }
        res.send(results)
    });

};

export const desigDepartment = async (req, res) => {

    const { dept_id }  = req.params;
    
    const desig_dept = "SELECT * FROM employee_data.desig_details WHERE dept_id = ? ";

    db.query(desig_dept, dept_id , (error, results) => {
        if(error){
            console.log(error);
        }
        res.send(results);
    });
};























































// const mysql = require("mysql2");

// const db = mysql.createPool({
//     host: "localhost",
//     user: "root",
//     password: "mypcot12345678@",
//     database: "employee_data"
// });

// export const addEmployee = async (req, res) => {

//     // res.send("Hello Employeee");
//     const emp_name = req.body.emp_name;
//     const dept_name = req.body.dept_name;
//     const emp_salary = req.body.emp_salary;

//     const empInsert = "INSERT INTO emp_details (emp_name, dept_name, emp_salary) VALUES ?";
//     const value = [[emp_name, dept_name, emp_salary]];

//     let addEmp = db.query(empInsert, [value], (error, results) => {
//         if (error) {
//             console.log('Failed to Add Employee ', error);
//             res.sendStatus(500)
//             return;
//         }
//     });

//     return res.status(200).json({
//         data: addEmp.values[0],
//         message: 'Employee Added Successfully',
//         status: true
//     });
// };

// export const listEmployee = async (req, res) => {

//     const list_emp = "SELECT * FROM emp_details";

//     db.query(list_emp, (error, results) => {
//         if(error){
//             console.log('Failed to List Employee ', error);
//             res.sendStatus(500)
//             return;
//         }
//         res.send(results);
//     });

// };

// export const idEmployee = async (req, res) => {

//     const { emp_id } = req.params;

//     const id_emp = "SELECT * FROM emp_details  WHERE emp_id = ?";

//     db.query(id_emp, emp_id, (error, results) => {
//         if(error){
//             console.log(error);
//         }
//         res.send(results);
//     });

// };

// export const updateEmployee = async (req, res) => {

//     const { emp_id } = req.params;
//     const emp_name = req.body.emp_name;
//     const dept_name = req.body.dept_name;
//     const emp_salary = req.body.emp_salary;

//     const update_emp = "UPDATE emp_details SET emp_name = ?, dept_name = ?, emp_salary = ? WHERE emp_id = ?";

//     db.query(update_emp, [emp_name, dept_name, emp_salary, emp_id], (error, results) => {
//         if(error){
//             console.log(error);
//         }
//         res.send(results);
//     });

// };

// export const removeEmployee = async (req, res) => {

//     const { emp_id } = req.params;
//     const removeEmp = "DELETE FROM emp_details WHERE emp_id = ? ";

//     db.query(removeEmp, emp_id, (error, results) => {
//         if(error){
//             console.log(error);
//         }
//     });
// };

// export const activeEmployee = async (req, res) => {

//     const { emp_id } = req.params;
//     const emp_status = req.body.emp_status;

//     const active_emp = "UPDATE emp_details SET emp_status = ? WHERE emp_id = ?";

//     db.query(active_emp, [ emp_status , emp_id ], (error, results) => {
//         if(error){
//             console.log(error);
//         }
//         res.send(results);
//     });

// };

// export const filterEmployee = async (req, res) => {

//     const { dept_name } = req.body.dept_name;

//     const filter_emp = "SELECT * FROM emp_details WHERE dept_name = ? ";

//     db.query(filter_emp, [ dept_name ], (error, results) => {
//         if(error){
//             console.log(error);
//         }
//         res.send(results);
//     });
// };

// export const searchEmployee = async (req, res) => {

//     // const {emp_id} = req.params;
//     const emp_name = req.body.emp_name;

//     const search_emp = "SELECT * FROM emp_details WHERE emp_name = ?";
//     // const search_emp = "SELECT emp_id, emp_name FROM emp_details";

//     db.query(search_emp, [ emp_name ], (error, results) => {
//         if(error){
//             console.log(error);
//         }
//         console.log(results);
//         res.send(results);
//     });
// };

// export const desigDepartment = async (req, res) => {

//     const { dept_id } = req.params;

//     const desig_dept = "SELECT * FROM desig_details WHERE dept_id = ? ";

//     db.query(desig_dept, [ dept_id ], (error, results) => {
//         if(error){
//             console.log(error);
//         }
//         console.log(results);
//         res.send(results);
//     });
// };