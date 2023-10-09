import {Template} from 'meteor/templating';
import {ReactiveDict} from 'meteor/reactive-dict';

import {helpers, events} from '/imports/modules/template';

import './CampaignEdition.html';

const DEFAULT_ACTION = {value: {}, children: []};
const INPUTS         = [

	{name: 'name', selector: '#name', events: ['input', 'click']},
	{name: 'start', selector: '#start', events: ['input']},
	{name: 'end', selector: '#end', events: ['input']},
	{name: 'active', selector: '#active', events: ['change']}

];

Template.campaignedition.onCreated(function() {

	this.form = new ReactiveDict();

	this.form.set(Template.currentData().campaign);

});

Template.campaignedition.helpers(helpers('form', INPUTS));

Template.campaignedition.events(Object.assign({}, events('form', INPUTS), {

	'click #add-action'(event, template){

		event.preventDefault();

		console.log(template);

		// This property provides access to the data context at the top level of the template.
		// It is updated each time the template is re-rendered. Access is read-only and non-reactive.

		const {campaign} = template.data;

		if(!campaign.actions){

			campaign.actions = DEFAULT_ACTION;

		}

		const test = Template.currentData();

		console.log('test', test);

	}

}));
