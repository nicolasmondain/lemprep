import {Meteor} from 'meteor/meteor';
import {Accounts} from 'meteor/accounts-base'
import {AccountSchema} from './AccountSchema';

Meteor.methods({

	'account.signup.submit'({email, password, profile = {}}){

		if(Meteor.users.findOne({'emails.address': email})){

			throw new Meteor.Error('Email already exists');

		}

		const user = {

			email,
			password,
			profile

		};

		AccountSchema.validate(user);

		const _id = Accounts.createUser(user);

		return _id;

	}

});
