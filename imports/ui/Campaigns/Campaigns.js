import {Template} from 'meteor/templating';

import {CampaignsCollection} from '../../api/Campaigns/CampaignsCollection.js';

import './Campaigns.html';
import './Campaign/Campaign.js';
import './Create/Create.js';

Template.campaigns.onCreated(function() {

	// Calling this.subscribe() (rather than Meteor.subscribe), which attaches a special
	// subscriptionsReady() function to the template instance, which is true when all
	// subscriptions made inside this template are ready.

	// Calling this.autorun sets up a reactive context which will re-initialize the
	// subscription whenever the reactive function this.getListId() changes.

	this.autorun(() => {

		this.subscribe('campaigns');

	});

});

Template.campaigns.helpers({

	campaigns(){

		return CampaignsCollection.find({}).fetch();

	}

});
