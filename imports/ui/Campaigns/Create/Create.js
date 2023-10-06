import {Meteor} from 'meteor/meteor';
import {Template} from 'meteor/templating';
import {FlowRouter} from 'meteor/ostrio:flow-router-extra';

import '../CampaignEdition/CampaignEdition';
import './Create.html';

Template.create.helpers({



});

Template.create.events({

	'submit form'(event){

		event.preventDefault();

		const name   = event.target.name.value;
		const start  = event.target.start.value;
		const end    = event.target.end.value;
		const active = event.target.active.checked;

		Meteor.call('campaign.create', {name, start, end, active}, (error) => {

			if(error){

				console.log(error);

				return;

			}

			FlowRouter.go('list');

		});

	}

});
