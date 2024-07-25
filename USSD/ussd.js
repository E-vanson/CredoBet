const express = require("express");
const UssdMenu = require("ussd-menu-builder");
const dotenv = require("dotenv");
const axios = require("axios");
dotenv.config();

const app = express();
let menu = new UssdMenu();

const token = process.env.TOKEN;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

let phoneNum;

app.get("/api/test", (req, res) => {
  const { sessionId, serviceCode, phoneNumber, text } = req.body;
  phoneNum = phoneNumber.startsWith("+")
    ? phoneNumber.substring(1)
    : phoneNumber;
  res.send("Testing the requests");
});

async function check_number(number) {
  const res = await axios.post(
    "https://04jnk0rg-5000.euw.devtunnels.ms/status",
    {
      phone_number: number,
    }
  );
  return res;
}

async function sendSms({ msg }) {
  console.log("Function start call...");
  console.log(phoneNum.substring(1) + " number");
  try {
    const response = await axios.post("https://merchant.cradlevoices.com/", {
      token: token,
      phone: [phoneNum.substring(1)], // Send phoneNum as an array
      message: msg,
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
    3: "Terms & Conditions",
  },
});

menu.state("Account", {
  run: () => {
    menu.con("Choose an Option:" + "\n1. Top Up" + "\n2. Withdraw");
  },
  next: {
    1: "Top Up",
    2: "Withdraw",
  },
  defaultNext: "invalidOption",
});

menu.state("Quick Bet", {
  run: async () => {
    const res = await check_number(phoneNum);

    if (res == "Your account status is active") {
      menu.con(
        "Select Sport:" + "\n1. Football" + "\n2. Basketball" + "\n3. NFL"
      );
    } else {
      menu.end("You had registered to a betting blocker service");
    }
  },
  next: {
    1: "Football",
    2: "Basketball",
    3: "NFL",
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
    3: "Liverpool vs Tottenham",
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
    3: "Arsenal - 1.7",
  },
  defaultNext: "invalidOption",
});

menu.state("Man United - 1.4", {
  run: () => {
    menu.con("Place your stake ");
  },
  next: {
    "*[0-9]+": "Stake",
  },
  defaultNext: "invalidOption",
});

menu.state("Terms & Conditions", {
  run: () => {
    menu.end(
      "To read the terms and conditions follow the below link: https://9335-216-128-0-68.ngrok-free.app/terms"
    );
  },
});

menu.state("Stake", {
  run: () => {
    menu.end("You have placed your bet successfully. Kindly wait for an SMS.");
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
