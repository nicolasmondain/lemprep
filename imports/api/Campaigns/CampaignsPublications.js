import {Meteor} from 'meteor/meteor';

import {CampaignsCollection} from './CampaignsCollection';

Meteor.publish('campaigns', function publishCampaigns(){

	return CampaignsCollection.find({

		'owner._id': this.userId

	});

});
