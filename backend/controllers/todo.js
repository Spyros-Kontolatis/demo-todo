const ObjectId = require("mongodb").ObjectId

const md = {}

md.add = async (req, res) => {
    let todo = req.body.text

    let inserted =  await req.db.collection("todos").insertOne({
        text: todo
    })
 
    let dbTodo = await req.db.collection("todos").findOne({
        _id: inserted.insertedId
    }) 

    res.json(dbTodo)
}

md.remove = async (req, res) => {
    
    // TO IMPLEMENT
    let deleted = await req.db.collection("todos").deleteOne({_id:new ObjectId(req.body.id)})
    let todos = await req.db.collection("todos").find({}).toArray()
    res.json(todos)
}

md.get = async (req, res) => {

    let todos = await req.db.collection("todos").find({}, { _id: 1, text: 1 }).toArray()

    res.json(todos)
}

module.exports = md