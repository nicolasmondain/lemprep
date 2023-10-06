import {Template} from 'meteor/templating';

import './CampaignEdition.html';

const DEFAULT_ACTION = {value: {}, children: []};

Template.campaignedition.helpers({});

Template.campaignedition.events({

	'click #add-action'(event, template){

		event.preventDefault();

		console.log(template);

		const {campaign} = template.data;

		if(!campaign.actions){

			campaign.actions = DEFAULT_ACTION;

		}

	}

});
