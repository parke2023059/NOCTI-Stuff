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
        this.retailprice = unitprice + this.profit
        this.subtotal = this.retailprice * qty
        this.salesTax = this.subtotal * 0.06
    }
}

function round( value ){
    value = value * 100
    value = Math.round(value)
    value /= 100
    return value
}


var orders = []


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
        salesTax: 0,
        profit: 0,
        total: 0
    }

    if (req.body.item1){order.items.push(new Item("Battlepass", req.body.item1, 7.13))}
    if (req.body.item2){order.items.push(new Item("Card", req.body.item2, 14.28))}
    if (req.body.item3){order.items.push(new Item("DLC", req.body.item3, 49.78))}

    for(let item of order.items){
        order.subtotal += Item.subtotal
        order.salesTax += item.salesTax
        order.profit += item.profit
        item.subtotal = round(item.subtotal)
        item.salesTax = round(item.salesTax)
        item.profit = round(item.retailprice)
        item.profit = round(item.profit)
    }

    order.total = order.subtotal + order.salesTax + order.shipping
    order.total = round(order.total)
    
    orders.push(order)
    console.log(order)

})

app.get('/vieworders', function(req,res){
    res.render('vieworders.ejs', {
        orders: orders
    })
})


app.listen(1600, function(){
    console.log("Server running on 1600")
})