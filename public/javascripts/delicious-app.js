import '../sass/style.scss';

import autocomplete from "./modules/autocomplete";
import { $, $$ } from './modules/bling';
import typeAhead from "./modules/typeAhead";

// $ is not jquery in this instance
autocomplete( $("#address"), $("#lat"), $("#lng") );

typeAhead( $(".search") );

// const flashbtn = document.querySelector("#flashBtn");
// if(flashbtn){
// 	setTimeout(function(){
// 		flashbtn.click();
// 	}, 5000);
// };