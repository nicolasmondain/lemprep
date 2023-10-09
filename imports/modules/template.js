import {Template} from 'meteor/templating';

export const events = (ReactiveDict, inputs) => {

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

export const helpers = (ReactiveDict, inputs) => {

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
