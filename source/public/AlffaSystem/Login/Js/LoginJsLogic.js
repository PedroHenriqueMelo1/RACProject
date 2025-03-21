import ElementsDicionary from './Elements.js';
import ButtonEngine  from './ButtonJs.js';


async function AddEventListeners() {
  ElementsDicionary.LoginButton.addEventListener('click', () => {
         ButtonEngine()

});
}

AddEventListeners();