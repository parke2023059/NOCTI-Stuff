//requirement modules
const express = require('express')
const app = express()
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: true}))


class Item {
    constructor( name, qty, amount ){
        //items
        this.name = name
        this.qty = qty
        this.amount = amount

        //money stuff
        this.subtotal = 0
        this.salestax = 0
        this.profit = 0
        this.total = 0
    }
}


var orders = []



//endpoints
app.get('/', function(req,res){
    res.render('index.ejs')
})

app.post('/', function(req,res){
    res.render('index.ejs')
    let order = {
        name : req.body.name,
        addr : req.body.address,
        item1 : req.body.amount1,
        item2 : req.body.amount2,
        item3 : req.body.amount3
    }
    console.log(order)
    let newOrder = new Item(order.name, order.item1, 7.13)
    orders.push(newOrder)
    console.log(orders)
})


app.get('/viewall', function(req,res){
    res.render('viewallorders.ejs')
})





//listen server
app.listen(1010, function(){
    console.log("Server running on port 1010")
})
