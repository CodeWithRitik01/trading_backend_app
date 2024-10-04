import axios from "axios";

let balance = 10000;
let postion = 0;
const trades = [];

const BUY_RULE = -0.02;
const SELL_RULE = 0.03;

// to fetch random price
async function fetchData() {
    try{
        const data = await axios.get('http://localhost:3000/rate');
        console.log(data.data)
        return data.data.price;
    }catch(error){
        console.error(error);
    }
}

//handling functionality which was mentioned
async function botApp(){
     const oldPrice  = await fetchData();   

     setInterval(async() =>{
        const newPrice = await fetchData();
        if(newPrice !== null){
            console.log(`current price ${newPrice.toFixed(2)}`)

            const percentChange = (newPrice - oldPrice) / oldPrice;

            if(percentChange <= BUY_RULE && balance >= newPrice){
                postion += 1; 
                balance -=newPrice;
                trades.push({type: 'buy', price: newPrice})
                console.log(`BOUGHT: new price ${newPrice.toFixed(2)}, balance: ${balance.toFixed(2)}`)
            }else if(percentChange >= SELL_RULE && postion > 0){
                postion -= 1;
                balance += newPrice;
                trades.push({type: "sell", price:newPrice})
                console.log(`SOLD: new price ${newPrice.toFixed(2)}, balance: ${balance.toFixed(2)}`)
            } 
        }
     }, 1000)
     
}

//for calculating profit or loss whichever occurs
function profitOrLossCalc(){
    let diff = balance - 10000;
    console.log(`final profit/loss: ${diff.toFixed(2)}`)
    console.log("Trades:", trades)
}


// ending request after 10sec
setTimeout(() =>{
    profitOrLossCalc();
    process.exit();
}, 10000);



export default botApp;