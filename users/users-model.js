const db = require("../database/dbConfig")

module.exports = {
    add, 
    find,
    findBy,
    findById,
    insert,
    remove
}

function find() {
    return db("users");
}
function findBy(filter){
    return db('users').where(filter).orderBy('id')
}
function findById(id){
    return db('users').where({id}).first()
}

async function add(user) {
    try{
        const [id] = await db('users').insert(user, "id")
        return findById(id)
    }catch(error){
        throw error
    }
}
function remove(id) {
    return db('users').where({ id }).del();	
  }	
async function insert(characters) {
    return db("users").insert(characters, "id");
  }
