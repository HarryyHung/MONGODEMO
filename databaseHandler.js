var MongoClient = require('mongodb').MongoClient
var url = 'mongodb://0.0.0.0:27017'

async function insertProduct(newProduct) {
    let client = await MongoClient.connect(url)
    let db = client.db("GCH1003")
    let newId = await db.collection("products").insertOne(newProduct)
    return newId
}
async function getAllProducts() {
    let client = await MongoClient.connect(url)
    let db = client.db("GCH1003")
    const results = await db.collection("products").find().toArray()
    return results
}
module.exports = {insertProduct}
