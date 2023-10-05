import { Meteor } from 'meteor/meteor';
import { CampaignsCollection } from './CampaignsCollection';

Meteor.methods({

		'campaigns.create.submit'({name, owner}){

			if(!Meteor.userId()){

				throw new Meteor.Error('Not authorized');

			}

			const _id = CampaignsCollection.insert({

				name,
				owner,
				start    : new Date(),
				end      : new Date(),
				createdAt: new Date()

			});

			return _id;

		}

});
