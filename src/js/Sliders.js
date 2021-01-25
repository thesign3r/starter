import Swiper from 'swiper';
class Sliders {
	constructor() {
		this.hero();
	}
	hero() {
		var hero = new Swiper('.swiper-container', {
			direction: 'horizontal',
			loop: true,
	
			// If we need pagination
			pagination: {
				el: '.swiper-pagination',
			},
	
			// Navigation arrows
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
	
			// And if we need scrollbar
			scrollbar: {
				el: '.swiper-scrollbar',
			},
		});
	}
	initSliders() {
		this.hero();
	}
}

export default Sliders