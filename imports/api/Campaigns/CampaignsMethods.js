import {Meteor} from 'meteor/meteor';
import {CampaignsCollection} from './CampaignsCollection';
import {CampaignsSchema} from './CampaignsSchema';

Meteor.methods({

		'campaign.create'({name, start, end, active}){

			if(!Meteor.userId()){

				throw new Meteor.Error('Not authorized');

			}

			const campaign = {

				name,
				start,
				end,
				active,
				createdAt: new Date(),
				owner    : {email: Meteor.user().emails[0].address, _id: Meteor.userId()}

			};

			CampaignsSchema.validate(campaign);

			return CampaignsCollection.insert(campaign);

		},
		'campaign.update'({_id, name, start, end, active}){

			const existing = CampaignsCollection.findOne({_id});

			if(!Meteor.userId() || existing.owner._id !== Meteor.userId()){

				throw new Meteor.Error('Not authorized');

			}

			if(!_id){

				throw new Meteor.Error('_id is required');

			}

			const campaign = {

				name,
				start,
				end,
				active,
				owner    : {email: Meteor.user().emails[0].address, _id: Meteor.userId()}

			};

			CampaignsSchema.validate(campaign);

			return CampaignsCollection.update(_id, campaign);

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
