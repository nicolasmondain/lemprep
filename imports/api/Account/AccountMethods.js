import {Meteor} from 'meteor/meteor';
import {Accounts} from 'meteor/accounts-base'

Meteor.methods({

	'account.signup.submit'({email, password, profile = {}}){

		if(Meteor.users.findOne({'emails.address': email})){

			throw new Meteor.Error('Email already exists');

		}

		const _id = Accounts.createUser({

			email,
			password,
			profile

		});

		return _id;

	}

});
