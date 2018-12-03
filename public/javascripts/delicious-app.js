import '../sass/style.scss';

import autocomplete from "./modules/autocomplete";
import { $, $$ } from './modules/bling';
import typeAhead from "./modules/typeAhead";
import makeMap from "./modules/map";

// $ is not jquery in this instance
autocomplete( $("#address"), $("#lat"), $("#lng") );

typeAhead( $(".search") );

makeMap( $("#map") );

// const flashbtn = document.querySelector("#flashBtn");
// if(flashbtn){
// 	setTimeout(function(){
// 		flashbtn.click();
// 	}, 5000);
// };