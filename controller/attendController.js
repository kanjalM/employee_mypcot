const mysql = require("mysql2");

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "mypcot12345678@",
    database: "employee_data"
});

export const addAttendance = async (req, res) => {

    const emp_id = req.body.emp_id
    const attend_type = req.body.attend_type;
    const from_date = req.body.from_date;
    const to_date = req.body.to_date;
    const start_time = req.body.start_time;
    const end_time = req.body.end_time;
    const approver = req.body.approver;

    const add_attend = "INSERT INTO attendance_details (emp_id, attend_type, from_date, to_date, start_time, end_time, approver) VALUES ?";
    const value = [[emp_id, attend_type, from_date, to_date, start_time, end_time, approver]]

    let addAttend = db.query(add_attend, [value], (error, results) => {
        if (error) {
            console.log('Failed to Add Attendance ', error);
            res.sendStatus(500)
            return;
        }
    });

    return res.status(200).json({
        data: addAttend.values[0],
        message: 'Attendance Added Successfully',
        status: true
    });

}

export const listAttendance= async (req, res) => {

    const list_attend = "SELECT * FROM attendance_details";

        db.query(list_attend, (error, results) => {
        if(error){
            console.log('Failed to List Attendance ', error);
            res.sendStatus(500)
            return;
        }
        res.send(results);

    });

};

export const emp_attend = async (req, res) => {

    const { emp_id } = req.params;

    const attend_emp = "SELECT * FROM attendance_details  WHERE emp_id = ?";

    db.query(attend_emp, emp_id, (error, results) => {
        if(error){
            console.log(error);
        }
        res.send(results);
    });

};