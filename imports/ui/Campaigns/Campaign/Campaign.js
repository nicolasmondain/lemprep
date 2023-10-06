
import {FlowRouter} from 'meteor/ostrio:flow-router-extra';
import {Meteor} from 'meteor/meteor';
import {Template} from 'meteor/templating';

import '../CampaignEdition/CampaignEdition';
import {CampaignsCollection} from '../../../api/Campaigns/CampaignsCollection.js';

import './Campaign.html';

Template.campaign.onCreated(function() {

	// Calling this.subscribe() (rather than Meteor.subscribe), which attaches a special
	// subscriptionsReady() function to the template instance, which is true when all
	// subscriptions made inside this template are ready.

	// Calling this.autorun sets up a reactive context which will re-initialize the
	// subscription whenever the reactive function this.getListId() changes.

	this.autorun(() => {

		this.subscribe('campaigns');

	});

});

Template.campaign.helpers({

	campaign(){

		// @ts-ignore

		const _id = FlowRouter.getParam('_id');

		return CampaignsCollection.findOne({

			_id,
			'owner._id': Meteor.userId()

		});

	}

});

Template.campaign.events({

	'submit form'(event){

		event.preventDefault();

		const name   = event.target.name.value;
		const start  = event.target.start.value;
		const end    = event.target.end.value;
		const active = event.target.active.checked;

		// @ts-ignore

		const _id = FlowRouter.getParam('_id');

		Meteor.call('campaign.update', {_id, name, start, end, active}, (error) => {

			if(error){

				console.log(error);

				return;

			}

		});

	}

});
