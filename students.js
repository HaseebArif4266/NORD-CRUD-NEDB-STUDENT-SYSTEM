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


 // Get all students from particular city
 // Endpoint: /api/v1/students/Karachi

 router.get('/city/:cityVar', async(req, res) => {
    try{
        await students.find( {city: req.params.cityVar}, (err, data) => {

            if(err){
                return res.status(500).json( { message: "Error in the DB"})
            }
            
            if( (data!=null) && (data.lenght>0)  ){
                res.status(200).send(data)
            }
            else{         
                res.status(400).json( { message: "No Student from this city"})
            }
        })
    }
    catch{
        res.status(500).json( { message: "Error in this API"})
    }
})

//homework 1
// GET the average score for all the students
// Endpoint: /api/v1/students/avgScore



//homework 2
  // first check if student with this name is already in the database
        // If not, Add this student
        // If yes, tell frontend that this student name already exists.

 router.get('/name/:nameVar', async(req, res) => {
    try{
        await students.findOne( {name: req.params.nameVar}, (err, data) => {

            if(err){
                return res.status(500).json( { message: "Error in the DB"})
            }
            
            if( (data!=null) && (data.lenght>0)  ){
                res.status(200).send(data)
            }
            else{         
                res.status(400).json( { message: "this student is already existed"})
            }
        })
    }
    catch{
        res.status(500).json( { message: "Error in this API"})
    }
})

 //http://localhost:4300/api/v1/students/name/teststudent//

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

router.delete('/', async(req,res) => {
    try{
        await students.remove({}, {multi:true}, (err, isDataDeleted) => {
            if(err){ return res.status(500).json( { message: "Error in the DB"}) };
            if(isDataDeleted){          
                res.status(200).json({message: "Student Deleted Successfully"})
            }
            else{       
                res.status(400).json( { message: "No Student Data in the DB"})
            }
        })
    }
    catch{
        res.status(500).json( { message: "Error in this API"})
    }
})

module.exports = router;