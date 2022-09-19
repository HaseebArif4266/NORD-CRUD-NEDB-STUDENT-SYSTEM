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

 //Get one student data by their ID
 //Endpoint: /api/v1/students/213213

 router.get('/:id', async(req, res) => {
    try{
        await students.findOne( {_id: req.params.id}, (err, data) => {
            if(err){
                return res.status(500).json( {message: "Error in the DB"})
            }
            if(data!=null){
                res.status(200).send(data)
            }
            else{
                res.status(400).json( {message: "Student with this ID does not exist"})
            }
        })
    }
    catch{
        res.status(200).json( {message: "Error in this API"})
    }
 })

 router.patch('/:idVariable', async(req,res) => {
    try{
        await students.update({_id: req.params.idVariable}, req.body, {upsert: false}, (err, IsDataUpdated) => {
            if(err){ return res.status(500).json( {message: "Error in the DB"}) };
            if(IsDataUpdated){
                res.status(200).json( { message: "student name: " + req.body.name + " updated successfully"})
            }
            else{
                res.status(400).json( {message: "Student with this ID does not exist"})
            }
        })
  
    }
    catch{
        res.status(500).json( {message: "Error in this API"})
    }
})


router.delete('/:idVariable', async(req,res) => {
    try{
        await students.remove({_id: req.params.idVariable}, (err, isDataDeleted) => {
            if(err){ return res.status(500).json( {message: "Error in the DB"}) };
            if(isDataDeleted){
                res.status(200).json( { message: "student Deleted successfully"})
            }
            else{
                res.status(400).json( {message: "Student with this ID does not exist"})
            }
        })

    }
    catch{
        res.status(500).json( {message: "Error in this API"})
    }
})

module.exports = router;