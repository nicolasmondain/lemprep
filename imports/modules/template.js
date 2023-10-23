import {Template} from 'meteor/templating';

export /**
 * events
 * Add Blaze Template events (form dedicated)
 * Update Template.instance().ReactiveDict on inputs[].events
 * @see https://www.blazejs.org/api/templates#Template-events
 * @param {string} ReactiveDict Name of the ReactiveDict
 * @param {object[]} inputs
 * @param {string} inputs[].name Name of the ReactiveDict key (input name attribute must be the same)
 * @param {string} inputs[].selector CSS selector (targets the associated InputHTMLElement)
 * @param {string[]} inputs[].events List of events to listen
 * @example
 * const INPUTS = [{name: 'name', selector: '#name', events: ['input', 'click']}];
 * events('editing', INPUTS);
 * @return {object} events map
 */
const events = (ReactiveDict, inputs) => {

	const em = {};

	for(let i = 0; i < inputs.length; i += 1){

		const input = inputs[i];

		em[`${input.events.join('/')} ${input.selector}`] = function(event, template){

			event.preventDefault();

			const {value, type, checked} = event.target;

			const instance = Template.instance();
			const update   = type === 'checkbox' ? checked : value;

			instance[ReactiveDict].set(input.name, update);

		};

	}

	return em;

};

export /**
 *
 * Add Blaze Template helpers (form dedicated)
 * @see https://www.blazejs.org/api/templates#Template-helpers
 * @param {string} ReactiveDict Name of the ReactiveDict
 * @param {object[]} inputs
 * @param {string} inputs[].name Name of the ReactiveDict key (input name attribute must be the same)
 * @param {string} inputs[].selector CSS selector (targets the associated InputHTMLElement)
 * @param {string[]} inputs[].events List of events to listen
 * @example
 * const INPUTS = [{name: 'name', selector: '#name', events: ['input', 'click']}];
 * helpers('editing', INPUTS);
 * @return {object} helpers
 */
const helpers = (ReactiveDict, inputs) => {

	const h = {};

	for(let i = 0; i < inputs.length; i += 1){

		const input = inputs[i];

		h[input.name] = function(){

			const instance = Template.instance();

			return instance[ReactiveDict].get(input.name);

		}

	}

	return h;

};
