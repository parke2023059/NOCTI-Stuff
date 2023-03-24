const express = require('express')
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
        this.salestax =  this.subtotal * 0.06
    }
}

function round( value ){
    value *= 100
    value = Math.round(value)
    value /= 100
    return value
}

var orders = []




app.get('/', function(req,res){
    res.render('index.ejs')
})

app.post('/', function(req,res){

    let order = {
        items: [],
        customerName: req.body.name,
        customerAddr: req.body.address,
        shipping: 0,
        subtotal: 0,
        salestax: 0,
        profit: 0,
        total: 0
    }

    if(req.body.item1) {order.items.push(new Item("Battlepass", req.body.item1, 7.13))}
    if(req.body.item2) {order.items.push(new Item("Card", req.body.item2, 49.78))}
    if(req.body.item3) {order.items.push(new Item("DLC", req.body.item3, 49.78))}

    for (let item of order.items) {
        item.subtotal = round(item.subtotal)
        item.salestax = round(item.salestax)
        item.profit = round(item.profit)
        item.total = round(item.total)

        order.subtotal += item.subtotal
        order.salestax += item.salestax
        order.profit += item.profit

    }

    if (order.subtotal < 40){
        order.shipping = 15
    } else if (order.subtotal < 150) {
        order.subtotal = 10
    }


    order.total = order.subtotal + order.salestax + order.shipping

    orders.push(order)
    console.log(orders)

    res.redirect('/viewall')
})

app.get('/viewall', function(req,res){
    res.render('viewall.ejs', {
        orders: orders
    })
})

app.listen(1600, function(){
    console.log("Server running on port: 1600")
})



