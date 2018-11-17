import '../sass/style.scss';

import { $, $$ } from './modules/bling';

const flashbtn = document.querySelector("#flashBtn");
setTimeout(function(){
	flashbtn.click();
}, 3000);
