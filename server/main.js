import {Meteor} from 'meteor/meteor';

// @ts-ignore

import {SyncedCron} from 'meteor/littledata:synced-cron';

import {CampaignsCollection} from '/imports/api/Campaigns/CampaignsCollection';

import '/imports/api/Account/AccountMethods';
import '/imports/api/Campaigns/CampaignsMethods';
import '/imports/api/Campaigns/CampaignsPublications';

SyncedCron.config({collectionName: 'cron'});

SyncedCron.add({

  name: 'Check actions to perform for each active campaign',
	schedule(parser){

		return parser.text('every 5 minutes');

  },
  job(){

		const now       = new Date().toISOString();
		const campaigns = CampaignsCollection.find({active: true, start: {$lte: now}, end: {$gte: now}}).fetch();

		for(let i = 0; i < campaigns.length; i += 1){

			const campaign  = campaigns[i];
			const {actions} = campaign;

			// on pousse les actions à effectuer dans une queue mongoDB
			// qui servira également de report pour une période définie (Time To Live Indexes)


		}

  }

});

Meteor.startup(() => {

	SyncedCron.start();

});
