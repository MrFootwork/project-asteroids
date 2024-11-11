const HEALTH_BAR_CONTAINER_CLASS = 'health-bar-container';
const HEALTH_BAR_CLASS = 'health-bar';
const THRESHHOLD_ORANGE = 0.7;
const THRESHHOLD_RED = 0.3;

class Bar {
	constructor({ totalValue, currentValue = totalValue, parentObject }) {
		this.total = totalValue;
		this.currentValue = currentValue;
		this.parent = parentObject;

		this.hasRenderedOnce = false;

		// Elements
		this.container = null;
		this.bar = null;
	}

	update(newValue) {
		this.currentValue = newValue;
	}

	render() {
		if (!this.hasRenderedOnce) this.#initialRender();

		this.bar.style.width = `${(this.currentValue * 100) / this.total}%`;

		// Set Color
		const healthInOrange =
			THRESHHOLD_RED < this.currentValue / this.total &&
			this.currentValue / this.total <= THRESHHOLD_ORANGE;
		const healthInRed = this.currentValue / this.total <= THRESHHOLD_RED;

		if (healthInOrange) this.bar.style.backgroundColor = 'orange';
		if (healthInRed) this.bar.style.backgroundColor = 'red';
	}

	#initialRender() {
		// Elements
		this.container = document.createElement('div');
		this.bar = document.createElement('div');

		// CSS Classes
		this.container.classList.add(HEALTH_BAR_CONTAINER_CLASS);
		this.bar.classList.add(HEALTH_BAR_CLASS);

		// HTML Structure
		this.container.appendChild(this.bar);
		this.parent.element.appendChild(this.container);

		// Styling
		this.container.style.width = `${this.parent.width / 2}px`;
		this.container.style.top = `${this.parent.width - 15}px`;
		this.container.style.left = `${
			this.parent.width / 2 - this.container.clientWidth / 2
		}px`;

		this.hasRenderedOnce = true;
	}
}

export default Bar;
