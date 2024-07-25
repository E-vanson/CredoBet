// const express = require('express');
// const UssdMenu = require('ussd-menu-builder');
// const dotenv = require('dotenv');
// const axios = require('axios');
// dotenv.config();

// const app = express();
// let menu = new UssdMenu();
// const arr = [];
// const token = process.env.TOKEN;

// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

// let phoneNum;

// app.get("/api/test", (req, res) => {
//     const { sessionId, serviceCode, phoneNumber, text } = req.body;
//     phoneNum = phoneNumber;const express = require('express');
//     const UssdMenu = require('ussd-menu-builder');
//     const dotenv = require('dotenv');
//     const axios = require('axios');
//     //const sendSms = require("../SMS/cradle")
//     dotenv.config();
    
//     const app = express();
    
//     let menu = new UssdMenu();
    
//     const token = process.env.TOKEN
    
//     app.use(express.json());
//     app.use(express.urlencoded({ extended: false }));
    
//     let phoneNum;
    
    
//     app.get("/api/test", (req, res) => {
//         const { sessionId, serviceCode, phoneNumber, text } = req.body;
//         phoneNum=phoneNumber
//         //const arr = [];
//         res.send("Testing the requests");

//       });
//       function sms (msg){
//         const axios = require('axios');
//         let data = JSON.stringify({
//         "token": "1ce28cc98d2828e6b988a3c77bc17d47b39f1cf004f2db2791f84575cc97e72e",
//         "message": msg,
//         "phone": [
//             phoneNum
//         ]
//         });

//         let config = {
//         method: 'post',
//         maxBodyLength: Infinity,
//         url: 'https://merchant.cradlevoices.com/',
//         headers: { 
//             'Content-Type': 'application/json'
//         },
//         data : data
//         };

//         axios.request(config)
//         .then((response) => {
//         console.log(JSON.stringify(response.data));
//         })
//         .catch((error) => {
//         console.log(error);
//         });
//     }
    
//       async function sendSms({msg}){
//         console.log("Function start call...")
//        // const {phoneNumber} = req.body;
//        const numberString = String(phoneNum);
    
//         await axios.post("https://merchant.cradlevoices.com/",{
//             token: token,
//             phone: [numberString],
//             message: msg
//         }) 
//          .then(function (response) {
//             console.log(response);
//           })
//           .catch(function (error) {
//             console.log(error);
//           });     
//     }
    
   
    
//       menu.startState({
//         run: () => {
//             // use menu.con() to send response without terminating session
//             menu.con(
//               "Welcome To Cradle Bet" +
//                 "\n1. Account" +
//                 "\n2. Quick Bet" +
//                 "\n3. Terms & Conditions"
//             );
//           },
//           // next object links to next state based on user input
//           next: {
//             1: "Account",
//             2: "Quick Bet",
//             3: "Terms & Conditions"
//           },
//         })
    
    
//         menu.state("Account",{
//             run: function () {
//                 menu.con(
//                     "Choose an Option:" +
//                     "\n1. Top Up" +
//                     "\n2. Withdraw"
//                 );
//               },
//               next: {
                
//                   1: "Top Up",
//                   2: "Withdraw"
//                 },
//               defaultNext: "invalidOption",
            
//          });
    
//          menu.state("Quick Bet",{
//             run: function () {
//                 menu.con(
//                     "Select Sport:" +
//                     "\n1. Football" +
//                     "\n2. Basketball"+
//                     "\n3. NFL"
//                 );
//               },
//               next: {
                
//                   1: "Football",
//                   2: "Basketball",
//                   3: "NFL"
//                 },
//               defaultNext: "invalidOption",
            
//          });
    
//          menu.state("Football",{
//             run: function () {
//                 menu.con(
//                     "Games:" +
//                     "\n1. Man United vs Arsenal" +
//                     "\n2. Man City vs Chelsea" +
//                     "\n3. Liverpool vs Tottenham"
//                 );
//               },
//               next: {
                
//                   1: "Man United vs Arsenal",
//                   2: "Man City vs Chelsea",
//                   3: "Liverpool vs Tottenham"
//                 },
//               defaultNext: "invalidOption",
            
//          });
    
//          menu.state("Man United vs Arsenal",{
//             run: function () {
//                 menu.con(
//                     "Man United vs Arsenal odds" +
//                     "\n1. Man United - 1.4" +
//                     "\n2. Draw - 2" +
//                     "\n3. Arsenal - 1.7"
//                 );
//               },
//               next: {
                
//                   1: "Man United - 1.4",
//                   2: "Draw - 2",
//                   3: "Arsenal - 1.7"
//                 },
//               defaultNext: "invalidOption",
            
//          });
    
//          menu.state("Man United - 1.4",{
//             run: function () {
//                 menu.con(
//                     "Place your stake "
//                 );
//               },
//               next: {
//                 '*[0-9]+': 'Stake'
//                 },
//               defaultNext: "invalidOption",
            
//          });
    
//          menu.state("Terms & Conditions",{
//             run: () => {
//                 menu.end('To read the terms and conditions Follow the below link  https://9335-216-128-0-68.ngrok-free.app/terms');
//             }
            
//          });
    
//          menu.state('Stake', {
//             run: () => {
//                 menu.end('You have placed your bet successfully kindly wait for an sms');
//                 sendSms({msg:"Bet placed Successfully"})
//             },
//         });
    
    
    
    
    
//       app.post("/ussd", function (req, res) {
//         menu.run(req.body, (ussdResult) => {
//           res.send(ussdResult);
//         });
//       });
    
    
//     const port  = process.env.PORT;
    
//     app.listen(port, (req, res) => {
//         console.log(`Ussd server listening on port ${port}`);
//       });
    
//     res.send("Testing the requests");
//     const number = phoneNumber;
// });

// async function sendSms({ msg }) {
//     console.log("Function start call...");
//     try {
//         const response = await axios.post("https://merchant.cradlevoices.com/", {
//             token: token,
//             phone: phoneNum,
//             message: msg
//         });
//         console.log("Response received:", response.data);
//     } catch (error) {
//         console.error("Error sending SMS:", error);
//     }
// }

// menu.startState({
//     run: () => {
//         menu.con(
//           "Welcome To Cradle Bet" +
//             "\n1. Account" +
//             "\n2. Quick Bet" +
//             "\n3. Terms & Conditions"
//         );
//     },
//     next: {
//         1: "Account",
//         2: "Quick Bet",
//         3: "Terms & Conditions"
//     }
// });

// menu.state("Account", {
//     run: () => {
//         menu.con(
//             "Choose an Option:" +
//             "\n1. Top Up" +
//             "\n2. Withdraw"
//         );
//     },
//     next: {
//         1: "Top Up",
//         2: "Withdraw"
//     },
//     defaultNext: "invalidOption",
// });

// menu.state("Quick Bet", {
//     run: () => {
//         menu.con(
//             "Select Sport:" +
//             "\n1. Football" +
//             "\n2. Basketball" +
//             "\n3. NFL"
//         );
//     },
//     next: {
//         1: "Football",
//         2: "Basketball",
//         3: "NFL"
//     },
//     defaultNext: "invalidOption",
// });

// menu.state("Football", {
//     run: () => {
//         menu.con(
//             "Games:" +
//             "\n1. Man United vs Arsenal" +
//             "\n2. Man City vs Chelsea" +
//             "\n3. Liverpool vs Tottenham"
//         );
//     },
//     next: {
//         1: "Man United vs Arsenal",
//         2: "Man City vs Chelsea",
//         3: "Liverpool vs Tottenham"
//     },
//     defaultNext: "invalidOption",
// });

// menu.state("Man United vs Arsenal", {
//     run: () => {
//         menu.con(
//             "Man United vs Arsenal odds" +
//             "\n1. Man United - 1.4" +
//             "\n2. Draw - 2" +
//             "\n3. Arsenal - 1.7"
//         );
//     },
//     next: {
//         1: "Man United - 1.4",
//         2: "Draw - 2",
//         3: "Arsenal - 1.7"
//     },
//     defaultNext: "invalidOption",
// });

// menu.state("Man United - 1.4", {
//     run: () => {
//         menu.con("Place your stake ");
//     },
//     next: {
//         '*[0-9]+': 'Stake'
//     },
//     defaultNext: "invalidOption",
// });

// menu.state("Terms & Conditions", {
//     run: () => {
//         menu.end('To read the terms and conditions follow the below link: https://9335-216-128-0-68.ngrok-free.app/terms');
//     }
// });

// menu.state('Stake', {
//     run: () => {
//         menu.end('You have placed your bet successfully. Kindly wait for an SMS.');
//         sms({ msg: "Bet placed successfully" });
//     },
// });

// app.post("/ussd", function (req, res) {
//     const { sessionId, serviceCode, phoneNumber, text } = req.body;
//     phoneNum = phoneNumber; // Ensure phoneNum is set from USSD request
//     menu.run(req.body, (ussdResult) => {
//         res.send(ussdResult);
//     });
// });

// const port = process.env.PORT || 3000;
// app.listen(port, () => {
//     console.log(`USSD server listening on port ${port}`);
// });
const express = require('express');
const UssdMenu = require('ussd-menu-builder');
const dotenv = require('dotenv');
const axios = require('axios');
dotenv.config();

const app = express();
let menu = new UssdMenu();

const token = process.env.TOKEN;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

let phoneNum;

app.get("/api/test", (req, res) => {
    const { sessionId, serviceCode, phoneNumber, text } = req.body;
    phoneNum = phoneNumber.startsWith('+') ? phoneNumber.substring(1) : phoneNumber;
    res.send("Testing the requests");
});

async function sendSms({ msg }) {
    console.log("Function start call...");
    console.log(phoneNum.substring(1) + " number")
    try {
        const response = await axios.post("https://merchant.cradlevoices.com/", {
            token: token,
            phone: [phoneNum.substring(1)], // Send phoneNum as an array
            message: msg
        });
        console.log("Response received:", response.data);
    } catch (error) {
        console.error("Error sending SMS:", error);
    }
}

menu.startState({
    run: () => {
        menu.con(
            "Welcome To Cradle Bet" +
            "\n1. Account" +
            "\n2. Quick Bet" +
            "\n3. Terms & Conditions"
        );
    },
    next: {
        1: "Account",
        2: "Quick Bet",
        3: "Terms & Conditions"
    }
});

menu.state("Account", {
    run: () => {
        menu.con(
            "Choose an Option:" +
            "\n1. Top Up" +
            "\n2. Withdraw"
        );
    },
    next: {
        1: "Top Up",
        2: "Withdraw"
    },
    defaultNext: "invalidOption",
});

menu.state("Quick Bet", {
    run: () => {
        menu.con(
            "Select Sport:" +
            "\n1. Football" +
            "\n2. Basketball" +
            "\n3. NFL"
        );
    },
    next: {
        1: "Football",
        2: "Basketball",
        3: "NFL"
    },
    defaultNext: "invalidOption",
});

menu.state("Football", {
    run: () => {
        menu.con(
            "Games:" +
            "\n1. Man United vs Arsenal" +
            "\n2. Man City vs Chelsea" +
            "\n3. Liverpool vs Tottenham"
        );
    },
    next: {
        1: "Man United vs Arsenal",
        2: "Man City vs Chelsea",
        3: "Liverpool vs Tottenham"
    },
    defaultNext: "invalidOption",
});

menu.state("Man United vs Arsenal", {
    run: () => {
        menu.con(
            "Man United vs Arsenal odds" +
            "\n1. Man United - 1.4" +
            "\n2. Draw - 2" +
            "\n3. Arsenal - 1.7"
        );
    },
    next: {
        1: "Man United - 1.4",
        2: "Draw - 2",
        3: "Arsenal - 1.7"
    },
    defaultNext: "invalidOption",
});

menu.state("Man United - 1.4", {
    run: () => {
        menu.con("Place your stake ");
    },
    next: {
        '*[0-9]+': 'Stake'
    },
    defaultNext: "invalidOption",
});

menu.state("Terms & Conditions", {
    run: () => {
        menu.end('To read the terms and conditions follow the below link: https://9335-216-128-0-68.ngrok-free.app/terms');
    }
});

menu.state('Stake', {
    run: () => {
        menu.end('You have placed your bet successfully. Kindly wait for an SMS.');
        sendSms({ msg: "Bet placed successfully" });
    },
});

app.post("/ussd", function (req, res) {
    const { sessionId, serviceCode, phoneNumber, text } = req.body;
    phoneNum = phoneNumber; // Ensure phoneNum is set from USSD request
    menu.run(req.body, (ussdResult) => {
        res.send(ussdResult);
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`USSD server listening on port ${port}`);
});
