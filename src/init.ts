import {initWordLists} from "./words/wordProcessing";


// Initialization stuff.
initWordLists();
// Disable right click.
document.addEventListener('contextmenu', event => event.preventDefault());


// // Testing stuff
//
//  for (let i = 2; i <= 7; i++) findBestFirstWords(i);
//
//
// const w = getRandomWordleGame();
//
// console.log(w.performGuess('hoper'))
// console.log(w.performGuess('hyper'))
// console.log(w.performGuess('hype'))
// console.log(w.performGuess('gross'))
// console.log(w.performGuess('abebb'))
// console.log(w.performGuess('slime'))
