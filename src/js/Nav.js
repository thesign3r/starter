class Nav {
	constructor() {
		this.hamburger();
	}

	hamburger() {
		let hamburger = document.querySelector('.nav-toggle');
		console.log('inith')
		if (!hamburger)
			return;

		let container = document.querySelector('body');
		hamburger.addEventListener('click', () => {
			hamburger.classList.toggle('nav--toggled')
			container.classList.toggle('nav--toggled')
		})
	}
}

export default Nav;