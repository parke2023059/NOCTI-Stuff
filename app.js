const express = require("express")
const app = express()

app.use(express.urlencoded({extended: true}))
app.set('view engine', 'ejs')

class Item {
    constructor(name, qty, unitprice){
        this.name = name
        this.qty = qty
        this.unitprice = unitprice
        this.profit = unitprice * 0.4
        this.retailprice = this.profit + unitprice
        this.subtotal = unitprice * qty
        this.salestax = this.subtotal * 0.06
    }
}


var orders = []

function round(value) {
    value *= 100
    Math.round(value)
    value /= 100
    return value
}

var test = 69.0009
round(test)
console.log(test)

app.get('/', function(req,res){
    res.render('index.ejs')
})

app.post('/', function(req,res){
    res.render('index.ejs')

    let order = {
        items: [],
        name: req.body.name,
        addr: req.body.address,
        shipping: 0,
        subtotal: 0,
        salestax: 0,
        profit: 0,
        total: 0
    }


    if (req.body.item1) {order.items.push(new Item("battlepass", req.body.item1, 7.13))}
    if (req.body.item2) {order.items.push(new Item("card", req.body.item2, 14.28))}
    if (req.body.item3) {order.items.push(new Item("dlc", req.body.item3, 49.68))}

    for (var item of order.items) {
        order.subtotal = item.subtotal
        order.salestax = item.salestax
        order.profit = item.profit
        order.total = item.total
        

    }





    if (order.subtotal < 40) {order.shipping = 15}
    if (order.subtotal < 150) {order.shipping = 10}


    order.total = order.subtotal + order.shipping + order.salestax

   orders.push(order)
   console.log(orders)

})

app.get('/viewall', function(req,res){
    res.render('viewall.ejs')
})


app.listen(1600, function(){
    console.log('Server running on port 1600')
})