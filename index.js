const express = require('express')
const app = express()
const port = 7002
const request = require('request')
const usersource = process.env.USERS_URL||"http://localhost:7000";
const ordersource = process.env.ORDERS_URL||"http://localhost:7001";
var retVal1
var retVal
app.get('/orderdetails/1', (req, res) => {    
	request(usersource +'/user/1', { json: true }, (err, resp, body) => {
	  if (err || !body) {         
	  	  res.send("Error while getting user info from "+usersource) 
	  } else{       
        retVal1 = body;   	
        request(ordersource + '/orders/1', { json: true }, (err, resp, body) => {
            if (err || !body) {
                res.send("Error while getting order info from " + ordersource);
            }
            else {                            
                retVal = body        
            }
        });	  
       
      }
    });

    res.send({
        "userDetails" : retVal1,
        "orders": retVal
    })
})


app.use(express.static('public'))

app.listen(port, () => console.log(`Listening on port ${port}!`))
