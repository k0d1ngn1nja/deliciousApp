import axios from "axios";
import { $ } from "./bling";

function likeStore(e){
	e.preventDefault();
	axios.post(this.action)
		.then(res =>{
			const isLiked = this.like.classList.toggle('heart__button--hearted');
			$('.heart-count').textContent = res.data.likes.length;
		}).catch(err => console.log(err));
};

export default likeStore;