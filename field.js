const getLetter = document.getElementById("getLetter");
const letterIndex = document.getElementById("letterIndex");
const go = document.getElementById("go");

let availableLetter = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

class Spin {
  sectors = ["100", "250", "*"];

  constructor(sectors = null) {
    if (sectors != null) this.sectors = sectors;
  }
  getField() {
    let n = Math.floor(Math.random() * this.sectors.length);
    return this.sectors[n];
  }
}

// let spin = new Spin(["100", "250", "*"]);
// alert(spin.getField());

class Player {
  #name;

  constructor(name) {
    this.#name = name;
  }

  getName() {
    return this.#name;
  }

  chooseLetter() {}
}

// const player = new Player("Ватсон");
// alert(player.getName());

class BotPlayer extends Player {
  chooseLetter(availableLetter) {
    const idx = Math.floor(Math.random() * availableLetter.length);
    console.log(availableLetter[idx]);
    return availableLetter[idx];
  }
}

class HumanPlayer extends Player {
  #choosenLetterIndex;

  chooseLetter(availableLetter) {
    this.#choosenLetterIndex = prompt(
      `Input your letter number from 0 to ${availableLetter.length}`
    );
    console.log(availableLetter[this.#choosenLetterIndex]);
    return availableLetter[this.#choosenLetterIndex];
  }
}

// const botPlayer = new BotPlayer("Watson");
// botPlayer.chooseLetter(availableLetter);
// const humanPlayer = new HumanPlayer("You");
// humanPlayer.chooseLetter(availableLetter);

class Game {
  #host;

  #players = [];

  #currentPlayer;

  #themeWords = [
    {
      title: "Auto",
      words: ["accumulator", "armrest", "brakes", "chassis", "clutch"],
    },
    {
      title: "City",
      words: ["library", "hospital", "gallery", "stall", "mosque"],
    },
  ];

  #botNames = ["Watson", "Sherlock", "Potter", "Germiona"];

  #theme;

  #targetWord;

  constructor(themeTitle = "Auto", humenPlayerNames = ["You"], botCount = 2) {
    this.#host = new Host();
    for (let name of humenPlayerNames) {
      this.#players.push(new HumanPlayer(name));
    }
    let availableBotNames = [...this.#botNames];
    console.log(availableBotNames);
    for (let i = 0; i < botCount; i++) {
      const index = Math.floor(Math.random() * availableBotNames.length);
      const name = availableBotNames[index];
      this.#players.push(new BotPlayer(name));
      availableBotNames.splice(index, 1);
      console.log(availableBotNames);
    }
    console.log(this.#players);
    this.#theme = themeTitle;

    this.#currentPlayer = this.#players[0];
    console.log(this.#currentPlayer);

    for (const theme of this.#themeWords) {
      if (theme.title == themeTitle) {
        const words = theme.words;
        this.#targetWord = words[Math.floor(Math.random() * words.length)];
        break;
      }
    }
    console.log(this.#targetWord);
  }

  setCurrentPlayer(n) {
    this.#currentPlayer = this.#players[n];
  }

  getCurrentPlayer() {
    return this.#currentPlayer;
  }

  run() {
    // Приветствие
    this.#host.sayHi(this.#players);
    for (let i = 0; i < this.#players.length; i++) {
      this.setCurrentPlayer(i);
      this.getCurrentPlayer().chooseLetter(availableLetter);
    }
  }
}

class Host {
  sayHi(players) {
    // let str = "";
    // for (let i = 0; i < players.length; i++) {
    //   str += players[i].getName() + " ";
    // }
    // Привет всем игрокам !
    const playersNames = players.map((item) => item.getName());
    alert("Hello! " + playersNames.join(", "));
  }
}

const game = new Game("City");
game.run();
