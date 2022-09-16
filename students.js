const express = require('express');
const router = express.Router();

const Database = require('nedb');
const students = new Database ({filename: 'database/students.db', autoload: true});

// get all students data from bd
// endpoint: api/v1/students
router.get('/', async (req, res)=> {
    try{
        await students.find({}).exec( (err,data) => {
            if(err){
                return  res.status(200).json({message: "Error in the DB"})
            }
            res.send(data)
        })

    }
    catch{
        res.status(500).json( {message: "Error in this API"})
    }
})

router.post('/', async(req,res) => {
    try{
        await students.insert(req.body);
        res.status(200).json( { message: "student added successfully"})
    }
    catch{
        res.status(500).json( {message: "Error in this API"})
    }
})

module.exports = router;