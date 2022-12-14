const { Int32, ObjectId } = require('bson')
var express = require('express')
const { insertProduct } = require('./databaseHandler')
var app = express()

var MongoClient = require('mongodb').MongoClient
var url = 'mongodb://0.0.0.0:27017'

app.set('view engine','hbs')
app.use(express.urlencoded({extended:true}))


app.post('/edit',async (req,res)=>{
    const id = req.body.id
    const name = req.body.txtName
    const price = req.body.txtPrice
    const picture = req.body.txtPic
    let client = await MongoClient.connect(url)
    let db = client.db("GCH1003") 
    await db.collection("products").updateOne({_id:ObjectId(id)}
            ,{$set : {"name":name,"price":price,"pictureURL":picture}})
    res.redirect('/view')
})

app.get('/edit',async (req,res)=>{
    const id = req.query.id
    let client = await MongoClient.connect(url)
    let db = client.db("GCH1003") 
    const productToEdit = await db.collection("products").findOne({_id:ObjectId(id)})
    res.render('edit',{product:productToEdit})
})

app.get('/delete',async (req,res)=>{
    const id = req.query.id
    let client = await MongoClient.connect(url)
    let db = client.db("GCH1003") 
    await db.collection("products").deleteOne({_id:ObjectId(id)})
    res.redirect('/view')
})

app.get('/view',async (req,res)=>{
    const results = await getAllProducts()
    res.render('view',{'results':results})
})

app.post('/new',async (req,res)=>{
    let name = req.body.txtName
    let price = req.body.txtPrice
    let picture = req.body.txtPic
    let newProduct = {
        name : name,
        price: Number.parseInt(price) ,
        pictureURL: picture
    }
    let newId = await insertProduct(newProduct)
    console.log(newId.insertedId)
    res.render('home')
})

app.get('/new',(req,res)=>{
    res.render('newProduct')
})

app.get('/',(req,res)=>{
    res.render('home')
})

const PORT = process.env.PORT || 3000
app.listen(PORT)
console.log("Server is up!")




