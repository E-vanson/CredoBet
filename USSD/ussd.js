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

async function withdrawAirtime({ amnt }) {
    console.log("Withdraw func start call...");
    console.log(phoneNum.substring(1) + " number")
    try {
        const response = await axios.post("https://0b47-41-139-168-163.ngrok-free.app/send_airtime", {
            phone_number: phoneNum,
            amount: amnt,
            currency_code: "KES"
            
        });
        console.log("Response received:", response.data);
    } catch (error) {
        console.error("Error sending airtime:", error);
    }
}

async function topUp({ amnt }) {
    console.log("Withdraw func start call...");
    console.log(phoneNum.substring(1) + " number")
    try {
        const response = await axios.post("https://0b47-41-139-168-163.ngrok-free.app/send_airtime", {
            phone_number: phoneNum,
            amount: amnt,
            currency_code: "KES"
            
        });
        console.log("Response received:", response.data);
    } catch (error) {
        console.error("Error sending airtime:", error);
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

menu.state("Top Up", {
    run: () => {
        menu.con(
            "Enter amount"
        );
    },
    next: {
       '*\\d+': 'topup.amount'
    },
    defaultNext: "invalidOption",
});

menu.state("Withdraw", {
    run: () => {
        menu.con(
            "Enter amount"
        );
    },
    next: {
        '*\\d+': 'withdraw.amount'
    },
    defaultNext: "invalidOption",
});

menu.state('topup.amount', {
    run: () => {
        let tAmount = menu.val;
        menu.end('Your request is being processed. Kindly wait for an SMS');
        sendSms({ msg: `To topup dial *140*${tAmount}*+ 254701458323#` });
    },
});


menu.state('withdraw.amount', {
    run: () => {
        let wAmount = menu.val
        menu.end(`You withdrawal for ${wAmount} is being processed. Kindly wait for an SMS.`);
        withdrawAirtime({amnt: wAmount})
       // sendSms({ msg: "Withdraw successfull" });
    },
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
        '*\\d+': 'Stake'
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
        let stake = menu.val
        menu.end('You have placed your bet successfully. Kindly wait for an SMS.');
        sendSms({ msg: `Bet for Man United placed successfully with a stake of ${stake}` });
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
