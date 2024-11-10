const HEALTH_BAR_CONTAINER_CLASS = 'health-bar-container';
const HEALTH_BAR_CLASS = 'health-bar';

class Bar {
	constructor({ totalValue, currentValue = totalValue, parentElement }) {
		this.total = totalValue;
		this.currentValue = currentValue;
		this.parent = parentElement;

		this.hasRenderedOnce = false;

		// Elements
		this.container = null;
		this.bar = null;
	}

	render() {
		if (!this.hasRenderedOnce) this.#initialRender();
	}

	#initialRender() {
		this.container = document.createElement('div');
		this.bar = document.createElement('div');

		this.container.classList.add(HEALTH_BAR_CONTAINER_CLASS);
		this.bar.classList.add(HEALTH_BAR_CLASS);

		this.container.appendChild(this.bar);
		this.parent.appendChild(this.container);

		this.hasRenderedOnce = true;
	}
}

export default Bar;
