import '../sass/style.scss';

import autocomplete from "./modules/autocomplete";
import { $, $$ } from './modules/bling';
import typeAhead from "./modules/typeAhead";
import makeMap from "./modules/map";
import likeStore from "./modules/like";

// $ is not jquery in this instance
autocomplete( $("#address"), $("#lat"), $("#lng") );

typeAhead( $(".search") );

makeMap( $("#map") );

const likeForms = $$("form.heart");
likeForms.on('submit', likeStore);

// const flashbtn = document.querySelector("#flashBtn");
// if(flashbtn){
// 	setTimeout(function(){
// 		flashbtn.click();
// 	}, 5000);
// };