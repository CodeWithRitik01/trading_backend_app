import express from "express";
import botApp from "./controller/controller.js";
const app = express();
const PORT = process.env.PORT || 3000;


//route to get random price
app.get('/rate', (req, res) =>{
    const stockprice = (Math.random() * 20 + 90).toFixed(2)
    res.json(
        {
            success: true, 
            price: parseFloat(stockprice)
        }
    )
})


// Base route which will start app
app.get('/', (req, res) =>{
    res.send("hello")
    botApp();
} )

app.listen(PORT, () =>{
    console.log(`App listening on ${PORT}`)
})