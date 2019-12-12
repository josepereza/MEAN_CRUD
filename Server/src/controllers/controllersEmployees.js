const db = require('../connection');

module.exports = {

    getEmployees : (req,res) => {
        db.query('SELECT * FROM employees ORDER BY id' , (error,rows) => {
            if (error) throw(error);
            res.json(rows);
        });
    },

    getEmployee : (req,res) => {
        const {id} = req.params;
        db.query('SELECT * FROM employees WHERE id = ?' , [id] , (error,rows) => {
            if (error) throw(error);
            else {
                if (rows.length == 0) res.json({'message' : 'The employee doesn´t exist'});
                else res.json(rows[0]);
            }
        });
    },

    insertEmployee : (req,res) => {
        const {name,surname,document,phone,address} = req.body;
       db.query('SELECT * FROM employees WHERE document = ?' , [document] , (error,rows) => {
            if (error) throw(error);
            
            else {
                if (rows.length != 0) res.json({'message' : 'There´s already an employee with that document' , 
                                                "success" : false});
                
                else {
                    db.query('INSERT INTO employees VALUES (DEFAULT,?,?,?,?,?)' , [name,surname,document,phone,address] , (error,rows) => {
                      if (error) throw(error);
                      res.json({'message' : `${[name]} ${[surname]} has been registered` , 'success' : true});  
                    });
                }
            }
        });
    
    },

    updateEmployee : (req,res) => {
        const {id} = req.params;
        const {name,surname,document,phone,address} = req.body;
        db.query('SELECT * FROM employees WHERE id = ? ' , [id] , (error,rows) => {
            if (error) throw(error);
            else {
                if (rows.length == 0) res.json({'message' : 'The employee doesn´t exist' , 'success' : false});
                else {
                    db.query('SELECT * FROM employees WHERE id != ? AND document = ?' , [id,document] , (error,rows) => {
                        if (error) throw(error);
                        else {
                            if (rows.length != 0) res.json({'message' : 'There´s already an employee with that document' , 'success' : false});
                            else {
                                db.query('UPDATE employees SET name=? , surname=? , document=? , phone=? , address=? WHERE id=?',
                                [name,surname,document,phone,address,id], (error) => {
                                    if (error) throw(error);
                                    res.json({'message' : 'Successfully updated employee' , 'success' : true});
                                });
                            }
                        }

                    });
                }
            }
        });
    },

    deleteEmployee : (req,res) => {
        const {id} = req.params;
        db.query('SELECT * FROM employees WHERE id=?' , [id] , (error,rows) => {
            if (error) throw(error);
            else {
                if (rows.length == 0 ) res.json({'message' : 'The employee doesn´t exist'});
                else {
                    let employee = `${rows[0].name} ${rows[0].surname}`;
                    db.query('DELETE FROM EMPLOYEES WHERE id = ? LIMIT 1' , [id] , (error) => {
                        if (error) throw(error);
                        res.json({'message' : `${employee} has been deleted`});
                    });
                }
            }
        });
    }
}
