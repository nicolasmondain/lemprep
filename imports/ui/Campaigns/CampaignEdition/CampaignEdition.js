import {Template} from 'meteor/templating';
import {ReactiveDict} from 'meteor/reactive-dict';
import {helpers, events} from '/imports/modules/template';

let collapsibleTree = null;

import './CampaignEdition.html';

const INPUTS = [

	{name: 'name', selector: '#name', events: ['input', 'click']},
	{name: 'start', selector: '#start', events: ['input']},
	{name: 'end', selector: '#end', events: ['input']},
	{name: 'active', selector: '#active', events: ['change']}

];

const DEFAULT_ACTION = {

	action  : 'action 0',
	root    : true,
	children: [

		{
			action: 'action 1 - a',
			children: []
		},
		{
			action: 'action 1 - b',
			children: [

				{
					action: 'action 2',
					children: []
				}

			]
		}
	]
};

Template.campaignedition.onCreated(function() {

	this.editing = new ReactiveDict();

	this.editing.set(Template.currentData().campaign);

});

Template.campaignedition.onRendered(async function() {

	const actions = this.editing.get('actions');

	if(actions && Object.prototype.hasOwnProperty.call(actions, 'action') && Object.prototype.hasOwnProperty.call(actions, 'children')){

		const d3Node = document.getElementById('d3');

		if(d3Node){

			({collapsibleTree} = collapsibleTree ? {collapsibleTree} : await import('/imports/modules/d3'));

			d3Node.innerHTML = '';

			d3Node.appendChild(collapsibleTree(actions));

		}
	}

});

Template.campaignedition.helpers(Object.assign({}, helpers('editing', INPUTS), {

	actions(){

		const instance = Template.instance();
		const actions  = instance['editing'].get('actions');

		return actions;

	},
	actionsToString(){

		const instance = Template.instance();
		const actions  = instance['editing'].get('actions');

		return JSON.stringify(actions);

	},
	actionsToArray(){

		const array    = [];
		const instance = Template.instance();
		const actions  = instance['editing'].get('actions');
		const iterate  = (action, index) => {

			const current = JSON.parse(JSON.stringify(action));

			if(Object.prototype.hasOwnProperty.call(current, 'children') && Array.isArray(current.children) && current.children.length){

				if(!array[index]){

					array[index] = [];

				}

				for(let i = 0; i < current.children.length; i += 1){

					array[index].push(current.children[i]);

					iterate(current.children[i], index + 1);

				}

			}

		};

		if(actions){

			array.push([{action: actions.action}]);

			iterate(actions, array.length);

			console.log(array);

		}

		return array;

	}

}));

Template.campaignedition.events(Object.assign({}, events('editing', INPUTS), {

	async 'click #add-action'(event, template){

		event.preventDefault();

		const instance = Template.instance();

		instance['editing'].set('actions', DEFAULT_ACTION);

		const d3Node = document.getElementById('d3');

		if(d3Node){

			({collapsibleTree} = collapsibleTree ? {collapsibleTree} : await import('/imports/modules/d3'));

			d3Node.innerHTML = '';

			d3Node.appendChild(collapsibleTree(instance['editing'].get('actions')));

		}

	}

}));
