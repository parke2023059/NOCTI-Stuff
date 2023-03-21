const express = require("express")
const app = express()

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: true}))

class Item{
    constructor(name, qty, unitprice){
        this.name = name
        this.qty = qty
        this.unitprice = unitprice
        this.profit = unitprice * 0.4
        this.retailprice = this.profit + unitprice
        this.subtotal = this.retailprice * qty
        this.salestax = this.subtotal * 0.06
    }
}

var orders = []

function round( value ) {
    value *= 100
    value = Math.round(value)
    value /= 100
    return value
}





app.get('/', function(req,res){
    res.render('index.ejs')
})

app.post('/', function(req,res){
    res.render('index.ejs')

    let order = {
        items: [],
        name: req.body.name,
        addr: req.body.address,
        subtotal: 0,
        retailprice: 0,
        shipping: 0,
        profit: 0,
        salestax: 0,
        total: 0
    }

    if(req.body.battlepass) {order.items.push(new Item("Battlepass", req.body.battlepass, 7.13))}
    if(req.body.card) {order.items.push(new Item("Card", req.body.card, 14.28))}
    if(req.body.dlc) {order.items.push(new Item("DLC", req.body.dlc, 49.78))}


    orders.push(order)
    
    for (const item of order.items) {
        item.subtotal = round(item.subtotal)
        item.profit = round(item.profit)
        item.salestax = round(item.salestax)
        item.retailprice = round(item.retailprice)

        order.subtotal = item.subtotal
        order.profit = item.profit
        order.salestax = item.salestax
        order.retailprice = item.retailprice
        
    }


    if (order.subtotal < 40) {
        order.shipping = 15
    } 

    if (order.subtotal < 150) {
        order.shipping = 10
    }

    order.total = order.subtotal + order.salestax + order.shipping
    order.total = round(order.total)
    console.log(orders)


    console.log(orders)



})


app.get('/viewall', function(req,res){
   res.render('viewall.ejs', {
    orders: orders
   })
})


app.listen(1600, function(){
    console.log("Server Running on port 1600")
})