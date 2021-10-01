/* jshint ignore:start */
const { from } = require("form-data");
const TelegramBot = require("node-telegram-bot-api");
const token = "2011631560:AAFfFLTPgclaP07568nNq-2CJHMa2cPRpYo";
const bot = new TelegramBot(token, { polling: true });

var users_state = [];

function userState(id) {
  let indexOfUser;
  let userState;
  let found = false;
  for (let i = 0; users_state.length; i++) {
    if (users_state[i] == id) {
      indexOfUser = i;
      found = true;
      userState = users_state[i];
    }
    if (!found) {
      users_state.push([id, 0]);
    }
  }
  return users_state;
}

function setMessage(userMsg, botMsg) {
  let opts = {
    reply_to_message_id: userMsg.message_id,
  };
  let chatId = userMsg.chat.id;
  return bot.sendMessage(chatId, botMsg, opts);
}

// depricated for now
bot.onText(/\/roll (.+)/, (msg, match) => {
  let chatId = msg.chat.id;
  let response = Math.floor(Math.random() * match[1]);
  console.log(match);
  const opts = {
    reply_to_message_id: msg.message_id,
  };
  bot.sendMessage(chatId, response, opts);
});

function resetState(msg) {
  users_state = 0;
  setMessage(msg, "everything is reset for @" + msg.from.username + " !");
}

bot.on("message", (msg) => {
  console.log("msg received");
  switch (msg.text) {
    case "/help":
      helpResponse(msg);
      break;
    case "/startGame":
      startGameRes(msg);
      break;
    case "/join":
      joinRes(msg);
      break;
    case "/saveGame":
      notReady(msg);
      break;
    case "/continueGame":
      notReady(msg);
      break;
    case "/createcharacter":
      notReady(msg);
      break;
    case "/help":
      notReady(msg);
      break;
    case "/roll 2":
      rollDice(msg, 2);
      break;
    case "/roll 4":
      rollDice(msg, 4);
      break;
    case "/roll 6":
      rollDice(msg, 6);
      break;
    case "/roll 8":
      rollDice(msg, 8);
      break;
    case "/roll 10":
      rollDice(msg, 10);
      break;
    case "/roll 12":
      rollDice(msg, 12);
      break;
    case "/roll 14":
      rollDice(msg, 14);
      break;
    case "/roll 16":
      rollDice(msg, 16);
      break;
    case "/roll 18":
      rollDice(msg, 18);
      break;
    case "/roll 20":
      rollDice(msg, 20);
      break;
    case "/createmonster":
      notReady(msg);
      break;
    case "/attackmonster":
      notReady(msg);
      break;
    case "/changexp":
      notReady(msg);
      break;
    case "/changegold":
      notReady(msg);
      break;
    case "/changehealth":
      notReady(msg);
      break;
    case "/inventoryupdate":
      notReady(msg);
      break;
    case "/showinventory":
      notReady(msg);
      break;
    case "/reset":
      resetState(msg);
      break;
  }
  const chatId = msg.chat.id;
  if (!msg.text.startsWith("/")) {
    const opts = {
      reply_to_message_id: msg.message_id,
    };
    bot.sendMessage(chatId, "unhandeled message!", opts);
  }
});

function rollDice(msg, num) {
  let response = Math.floor(Math.random() * num);
  setMessage(msg, response);
}

function helpResponse(msg) {
  let response = `Jack is trying to help to automate a few processes in the game, making it easier to play it through telegram!
  \n Here are a list of commands that I can execute!(well , they are not ready yet🚶‍♂️)
  \n
  \n /startGame - start a new game 🎮
  \n /saveGame - save current game 💾
  \n /continueGame <gameId> - continue a saved game
  \n /createcharacter - Use this command and follow the prompts to create a new character 🙎
  \n /characterstats <character name> - Prints a character's stats, add the name of the chharacter after the command 📊
  \n /help - Open this help message ℹ️
  \n /roll <number> - Rolls a dice!🎲
  \n /createmonster <monster name> <health points> - Creates a monster 👾
  \n /attackmonster <monster name> <damage> - Reduces health of the monster by a given number ⚔️
  \n /changexp <character name> +/- <number> - Adds or subtracts a certain amount of health from a character 💠
  \n /changegold <character name> +/- <number> - Adds or subtracts a certain amount of gold from a character 💰
  \n /changehealth <character name> +/- <number> - Adds or subtracts a certain amount of health from a character
  \n /inventoryupdate <character name> add/remove <item> <no. of item> - Adds or removes a certain amount of a specific item from a character's inventory
  \n /showinventory <character name> - Current state of the inventory 🎒`;
  setMessage(msg, response);
}

function notReady(msg) {
  setMessage(msg, "this command is not ready yet! 🚶‍♂️");
}

function startGameRes(msg) {
  const message = `you have 30 seconds Time, for join the game
    \n click( /join ) - Or type that in the input field in below`;
  setMessage(msg, message).then((res) => {
    setTimeout(() => {
      bot.deleteMessage(msg.chat.id, res.message_id);
    }, 3 * 1000);
  });
}

function joinRes(msg) {
  setMessage(
    msg,
    "You can join the Game! Now you must choose a charecter for yourself \n /paladin   /warrior   /mage   /shaman   /deathknight"
  );
  pushUsers(msg);
}

function pushUsers(msg) {
  const user = {
    name: msg.from.first_name,
    id: msg.from.id,
    // and all data if we need
  };
  users_state.push(user);

  return console.log(users_state);
}
// {
//   message_id: 96,
//   from: {
//     id: 402077140,
//     is_bot: false,
//     first_name: 'Hamid',
//     username: 'HrAyazi',
//     language_code: 'en'
//   },
//   chat: {
//     id: -532882546,
//     title: 'dnd',
//     type: 'group',
//     all_members_are_administrators: true
//   },
//   date: 1631971018,
//   reply_to_message: {
//     message_id: 20,
//     from: {
//       id: 1973432621,
//       is_bot: true,
//       first_name: 'Geeky D&D',
//       username: 'GeekyDnDbot'
//     },
//     chat: {
//       id: -532882546,
//       title: 'dnd',
//       type: 'group',
//       all_members_are_administrators: true
//     },
//     date: 1631720647,
//     text: 'Received your message'
//   },
//   text: 'hmmmmmmmmmmmmm'
// }
