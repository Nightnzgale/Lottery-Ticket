// Layla Wong - Lottery Ticket - Final Project
const boxes = document.querySelectorAll(".box");
const newTicketButton = document.querySelector(".new_ticket_button");
const resultDiv = document.createElement("div");
let newTicketClicked = false;

const eevees = [
  {
    name: "Eevee",
    image: "/resources/eevees/eevee.gif",
    value: 10
  },

  {
    name: "Vaporeon",
    image: "/resources/eevees/vaporeon.gif",
    value: 25
  },

  {
    name: "Jolteon",
    image: "/resources/eevees/jolteon.gif",
    value: 25
  },

  {
    name: "Flareon",
    image: "/resources/eevees/flareon.gif",
    value: 30
  },

  {
    name: "Espeon",
    image: "/resources/eevees/espeon.gif",
    value: 50
  },

  {
    name: "Umbreon",
    image: "/resources/eevees/umbreon.gif",
    value: 75
  },

  {
    name: "Leafeon",
    image: "/resources/eevees/leafeon.gif",
    value: 40
  },

  {
    name: "Glaceon",
    image: "/resources/eevees/glaceon.gif",
    value: 40
  },

  {
    name: "Sylveon",
    image: "/resources/eevees/sylveon.gif",
    value: 99999999
  }
];



let scratchedBoxes = 0;
let totalWinnings = 0;

let currentTicket = [];

function makeTicket() {

    scratchedBoxes = 0;
    totalWinnings = 0;
    currentTicket = [];
    
    for (let i = 0; i < boxes.length; i++) {

        const randomIndex = Math.floor(Math.random() * eevees.length);

        currentTicket.push(eevees[randomIndex]);
    }

    boxes.forEach((box, index) => {

        box.classList.remove("scratched");
        box.addEventListener("click", function(event) {
            scratch(event, index);
        });
    });

    if(newTicketClicked)
    {
      location.reload();
      newTicketClicked = false;    
    }

    
}

function scratch(event, index) {

    const box = event.currentTarget;

    if (box.classList.contains("scratched")) {
        return;
    }

    box.classList.add("scratched");

    const chosenEevee = currentTicket[index];

    scratchedBoxes++;

    box.innerHTML = `
        <div class="revealed_card">

            <img
                class="revealed_eevee"
                src="${chosenEevee.image}"
                alt="${chosenEevee.name}"
            >

            <p class="eevee_name">
                ${chosenEevee.name}
            </p>

            <p class="eevee_value">
                $${chosenEevee.value}
            </p>

        </div>
    `;

    // all scratched
    if (scratchedBoxes === boxes.length) {
        calculateWinnings();
    }

    
}

// calculate winnings
function calculateWinnings() {

    let eeveeCounts = {};

    // count eevees
    currentTicket.forEach((eevee) => {

        if (eeveeCounts[eevee.name]) {
          eeveeCounts[eevee.name]++;
        }

        else {
          eeveeCounts[eevee.name] = 1;
        }
    });

    // check matches
    currentTicket.forEach((eevee) => {

        if (eeveeCounts[eevee.name] >= 3) {
          totalWinnings = eevee.value;
        }
    });

    // display result
  
    resultDiv.id = "result_div";
    const invisDiv = document.querySelector(".big_invis");
    invisDiv.appendChild(resultDiv);
    
    if (totalWinnings > 0) {

        resultDiv.innerHTML +=
            `<p>YOU WON $${totalWinnings}!</p>`;
    }

    else {

        resultDiv.innerHTML +=
            "<p>You lost!</p>";
    }
    resultDiv.innerHTML += '<button onclick="makeTrue()" class="new_ticket_button">TRY YOUR LUCK AGAIN</button>';
}

function makeTrue() {
    newTicketClicked = true;
    makeTicket();
}

// start game
makeTicket();