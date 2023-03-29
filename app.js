const express = require("express")
const app = express()

app.use(express.urlencoded({extended: true}))
app.set('view engine', 'ejs')

var port = 1600


function round( value ) {
    value *= 100
    value = Math.round(value)
    value /= 100

    return value
}

class Item {
    constructor(name, qty, unitprice){
        this.name = name
        this.qty = qty
        this.unitprice = unitprice
        this.profit = unitprice * 0.4
        this.retailprice = this.profit + this.unitprice
        this.subtotal = this.retailprice * qty
        this.salestax = this.subtotal * 0.06
    }
}

var orders = []


app.get('/', function(req,res){
    res.render('index.ejs')
})


app.post('/', function(req,res){

    var order = {
        items: [],
        customerName: req.body.name,
        customerAddress: req.body.address,
        shipping: 0,
        subtotal: 0,
        salestax: 0,
        profit: 0,
        total: 0
    }

    if (req.body.item1) {order.items.push(new Item("Battlepass", req.body.item1, 7.13))}
    if (req.body.item2) {order.items.push(new Item("Card", req.body.item3, 14.28))}
    if (req.body.item3) {order.items.push(new Item("DLC", req.body.item3, 49.78))}


    for (var item of order.items){
      order.subtotal = round(item.subtotal)
      order.salestax = round(item.salestax)
      order.profit = round(item.profit)

        order.subtotal += item.subtotal
        order.salestax += item.salestax
        order.profit += item.profit




    }


    if (order.subtotal < 40) {order.shipping = 15}
    else if (order.subtotal < 150) {order.shipping = 10}

    order.total = order.shipping + order.salestax + order.subtotal
    round(order.total)

    orders.push(order)
    console.log(orders)


    res.redirect('/viewall')
})

app.get('/viewall', function(req,res){
    res.render('viewall.ejs', {
        orders: orders
    })
})

app.listen(port, function(){
    console.log(`Server running on port ${port}`)
})