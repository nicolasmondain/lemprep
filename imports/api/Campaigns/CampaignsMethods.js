import {Meteor} from 'meteor/meteor';
import {CampaignsCollection} from './CampaignsCollection';

Meteor.methods({

		'campaign.create'({name, start, end, active}){

			if(!Meteor.userId()){

				throw new Meteor.Error('Not authorized');

			}

			return CampaignsCollection.insert({

				name,
				start,
				end,
				active,
				createdAt: new Date(),
				owner    : {email: Meteor.user().emails[0].address, _id: Meteor.userId()}

			});

		},
		'campaign.update'({_id, name, start, end, active}){

			const campaign = CampaignsCollection.findOne({_id});

			if(!Meteor.userId() || campaign.owner._id !== Meteor.userId()){

				throw new Meteor.Error('Not authorized');

			}

			if(!_id){

				throw new Meteor.Error('_id is required');

			}

			return CampaignsCollection.update(_id, {

				name,
				start,
				end,
				active,
				owner    : {email: Meteor.user().emails[0].address, _id: Meteor.userId()}

			});

		},
		'campaign.remove'(_id){

			if(!Meteor.userId()){

				throw new Meteor.Error('Not authorized');

			}

			if(!_id){

				throw new Meteor.Error('_id is required');

			}

			return CampaignsCollection.remove(_id);

		}

});
