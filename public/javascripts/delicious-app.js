import '../sass/style.scss';

import autocomplete from "./modules/autocomplete";
import { $, $$ } from './modules/bling';


// $ is not jquery in this instance
autocomplete( $("#address"), $("#lat"), $("#lng") );

const flashbtn = document.querySelector("#flashBtn");
if(flashbtn){
	setTimeout(function(){
		flashbtn.click();
	}, 3000);
};