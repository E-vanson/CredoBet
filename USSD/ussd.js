const express = require('express');
const UssdMenu = require('ussd-menu-builder');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

let menu = new UssdMenu();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.get("/api/test", (req, res) => {
    const { sessionId, serviceCode, phoneNumber, text } = req.body;
    res.send("Testing the requests");
    const number = phoneNumber;
  });


  menu.startState({
    run: () => {
        // use menu.con() to send response without terminating session
        menu.con(
          "Welcome To Cradle Bet" +
            "\n1. Account" +
            "\n2. Quick Bet" +
            "\n3. Terms & Conditions"
        );
      },
      // next object links to next state based on user input
      next: {
        1: "Account",
        2: "Quick Bet",
        3: "Terms & Conditions"
      },
    })


    menu.state("Account",{
        run: function () {
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

     menu.state("Quick Bet",{
        run: function () {
            menu.con(
                "Select Sport:" +
                "\n1. Football" +
                "\n2. Basketball"+
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

     menu.state("Football",{
        run: function () {
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

     menu.state("Man United vs Arsenal",{
        run: function () {
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

     menu.state("Man United - 1.4",{
        run: function () {
            menu.con(
                "Place your stake "
            );
          },
          next: {
            '*[0-9]+': 'Stake'
            },
          defaultNext: "invalidOption",
        
     });

     menu.state("Terms & Conditions",{
        run: () => {
            menu.end('To read the terms and conditions Follow the below link  https://9335-216-128-0-68.ngrok-free.app/terms');
        }
        
     });

     menu.state('Stake', {
        run: () => {
            menu.end('You have placed your bet successfully kindly wait for an sms');
        }
    });





  app.post("/ussd", function (req, res) {
    menu.run(req.body, (ussdResult) => {
      res.send(ussdResult);
    });
  });


const port  = process.env.PORT;

app.listen(port, (req, res) => {
    console.log(`Ussd server listening on port ${port}`);
  });
