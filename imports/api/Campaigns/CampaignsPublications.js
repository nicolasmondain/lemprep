import { Meteor } from 'meteor/meteor';
import { CampaignsCollection } from './CampaignsCollection';

Meteor.publish('campaigns', function(){

	return CampaignsCollection.find({

		'owner._id': this.userId

	});

});

Meteor.publish('campaign', function(campaignId){

	check(campaignId, String);

	return CampaignsCollection.find({

		_id          : campaignId,
		'owner._id': this.userId

	});

});
