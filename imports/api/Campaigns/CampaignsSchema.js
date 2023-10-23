import SimpleSchema from 'simpl-schema';

export const CampaignsSchema = new SimpleSchema({

	name     : {type: String, max: 200},
	start    : {type: Date},
	end      : {type: Date},
	active   : {type: Boolean},
	createdAt: {type: Date},
	owner    : {type: Object}

});
