const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const saltRounds = 10

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "mypcot12345678@",
    database: "employee_data"
});

export const addUser = async (req, res) => {
        
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const email = req.body.email;
    const password = req.body.password;

    bcrypt.hash(password,saltRounds, (err, hash) => {

        db.query(
            "INSERT INTO user_details (first_name, last_name, email, password) VALUES (?,?,?,?)",
            [first_name, last_name, email, hash], 
            (error, results) => {
            if (error) {
                console.log('Failed to Register User ', error);
                res.sendStatus(500)
                return;
            }
            res.status(200).send(results);
            return;
        });

    })

};

export const userLogin = async (req, res) => {

    const email = req.body.email;
    const password = req.body.password;
  
    db.query(
        "SELECT * FROM employee_data.user_details WHERE email = ? ", 
        email, 
        (error, results) => {
        if (error) {
            console.log({error: error});
            res.send({error: error});
        }
        if(results.length > 0) {
            bcrypt.compare(password, results[0].password, (err, resp) => {
                if(resp){
                    const total_attempts = results[0].total_attempts;
                    if(total_attempts==0){
                        req.session.user_id = results[0].user_id;
                            console.log('session',req.session.user_id);
                        res.cookie('userId', results[0].user_id);
                            console.log('cookie',req.cookies);
                        res.status(200).send(results);
                        return;
                    }
                    db.query(
                        "UPDATE user_details SET total_attempts = 0 WHERE email = ?",
                        email,
                        (er, resul) => {
                            req.session.user_id = results[0].user_id;
                                console.log('session',req.session.user_id);
                            res.cookie('userId', results[0].user_id);
                                console.log('cookie',req.cookies);
                            res.status(200).send(results);
                            return;
                        }
                    );
                    
                }else{
                    const total_attempts = results[0].total_attempts + 1;
                    let redirect = false;
                    if(total_attempts==5){
                        redirect = true;
                        res.send({ message: "Wrong Email Or Password", redirect })
                        return;
                    }
                    db.query(
                        "UPDATE user_details SET total_attempts = total_attempts + 1 WHERE email = ?",
                        email,
                        (er, resul) => {
                            console.log(resul);
                            res.send({ message: "Wrong Email Or Password", redirect })
                        }
                    )
                }
            });
        }else{
            res.send({ message: "User Doesn't Exist" });
        }
    });
};

export const userLogout = async (req,res) => {

    req.session.destroy();
    res.clearCookie('userId');

    return res.status(200).json({
        message: 'Session Destroyed',
        status: true
    });

};