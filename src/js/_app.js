import './../css/_app.scss'
// import * as basicScroll from 'basicscroll'
import utils from './utils';
import Aoe from 'aoejs';

import Sliders from './Sliders';
import Forms from './Forms';
import Nav from './Nav';
import Transitions from './Transitions';
require('./canvas/index')

export default class App {
	constructor() {
		this.initDev(); // tests and shit
		this.initBody(); // runs on initialize & after barba
	}

	initBody() {
		const sliders = new Sliders();
		const forms = new Forms();
		const aoe = new Aoe();
		aoe.init({});
	}

	initCore() {
		const transitions = new Transitions();
		const nav = new Nav();
	}

	initDev() {
	}
}


function LoadApp() {
	const app = new App();
	app.initCore(); // runs on initialize
}

if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', LoadApp);
} else {
	LoadApp();
}