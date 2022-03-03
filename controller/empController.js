const mysql = require("mysql2");
import multer from "multer";

const fs = require('fs');

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "mypcot12345678@",
    database: "employee_data"
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'assets');
    },
    filename: function (req, file, cb){
        cb(null, file.fieldname + '-' + Date.now() + '.pdf');
    }
});

export const addEmployee = async (req, res) => {

    const uploadFile = multer({ storage: storage}).single('resume');
    uploadFile(req, res, async function (err){

        const filename = req.file.filename;
        
        const emp_name = req.body.emp_name;
        const dept_id = req.body.dept_id;
        const desig_name = req.body.desig_name;
        const emp_salary = req.body.emp_salary;
        const emp_dob = req.body.emp_dob;
        const emp_gender = req.body.emp_gender;

        const empInsert = "INSERT INTO emp_details (emp_name, dept_id, desig_name, emp_salary, emp_dob, emp_gender, resume) VALUES ?";
        const value = [[emp_name, dept_id, desig_name, emp_salary, emp_dob, emp_gender, filename]];

        db.query(empInsert, [value], (error, results) => {
            if (error) {
                console.log('Failed to Add Employee ', error);
                res.sendStatus(500)
                return;
            }
            res.status(200).send(results);
            return;
        });

    });
};

export const listEmployee = async (req, res) => {

    const list_emp = "SELECT * FROM emp_details";

    var host= req.get("host")

        db.query(list_emp, (error, results) => {
        if(error){
            console.log('Failed to List Employee ', error);
            res.sendStatus(500)
            return;
        }
        const modifiedData = results.map (item => {
            item['pdfPath'] = 'http://'+host+'/assets/' + item.resume
            return item
        })
        res.send(modifiedData);

    });

};

export const idEmployee = async (req, res) => {

    const { emp_id } = req.params;
    const id_emp = "SELECT * FROM emp_details  WHERE emp_id = ?";

    db.query(id_emp, emp_id, (error, results) => {
        if(error){
            console.log(error);
        }
        res.send(results);
    });

};

export const updateEmployee = async (req, res) => {

    const uploadFile = multer({ storage: storage}).single('resume');
    uploadFile(req, res, async function (err){

        const filename = req.file.filename;
        var host= req.get("host")

        const { emp_id } = req.params;
        const emp_name = req.body.emp_name;
        const dept_id = req.body.dept_id;
        const desig_name = req.body.desig_name;
        const emp_salary = req.body.emp_salary;
        const emp_dob = req.body.emp_dob;
        const emp_gender = req.body.emp_gender;
        const oldResume = req.body.old_resume;
        if(filename.length > 0){
            fs.unlink('http://'+host+'/assets/' + oldResume, (err => {
                if (err) console.log(err);
                else {
                console.log("\nDeleted file: example_file.txt");
                }
            }));
        }

        const update_emp = "UPDATE emp_details SET emp_name = ?, dept_id = ?, desig_name = ?, emp_salary = ?, emp_dob = ?, emp_gender = ?, resume = ? WHERE emp_id = ?";

        db.query(update_emp, [emp_name, dept_id, desig_name, emp_salary, emp_dob, emp_gender, filename, emp_id], (error, results) => {
            if(error){
                console.log(error);
            }
            res.send(results);
        });

    });

};

export const removeEmployee = async (req, res) => {

    const { emp_id } = req.params;
    const removeEmp = "DELETE FROM emp_details WHERE emp_id = ? ";

    db.query(removeEmp, emp_id, (error, results) => {
        if(error){
            console.log(error);
        }
    });
};

export const activeEmployee = async (req, res) => {

    const { emp_id } = req.params;
    const emp_status = req.body.emp_status;

    const active_emp = "UPDATE emp_details SET emp_status = ? WHERE emp_id = ?";

    db.query(active_emp, [ emp_status , emp_id ], (error, results) => {
        if(error){
            console.log(error);
        }
        res.send(results);
    });

};

export const filterEmployee = async (req, res) => {

    const { dept_id } = req.params;

    const filter_emp = "SELECT * FROM emp_details WHERE dept_id = ? ";

    db.query(filter_emp, [ dept_id ], (error, results) => {
        if(error){
            console.log(error);
        }
        res.send(results);
    });
};

export const listProjectManager = async (req, res) => {

    const list_manager = "SELECT * FROM emp_details where desig_name = 'Project Manager'";

    db.query(list_manager, (error, results) => {
        if(error){
            console.log(error);
        }
        res.send(results);
    });
};