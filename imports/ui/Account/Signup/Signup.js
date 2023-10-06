import {Template} from 'meteor/templating';
import {Log} from 'meteor/logging'

import './Signup.html';


Template.signup.events({

	'submit form'(event){

		event.preventDefault();

		const email    = event.target.email.value;
		const password = event.target.password.value;

		Log(email, password);
		Log(event);

		Meteor.call('account.create.submit', {email, password}, (errorResponse) => {

			if(errorResponse){

				Log(errorResponse.error);

			}

		});

	}

});
