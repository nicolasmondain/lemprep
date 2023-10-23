import SimpleSchema from 'simpl-schema';

import '../../../infra/CustomError';

export const AccountSchema = new SimpleSchema({

	// @ts-ignore

	email   : {type: String}, // regEx: SimpleSchema.RegEx.Email
	password: {type: String},
	profile : {type: Object}

});
