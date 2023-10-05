import {Template} from 'meteor/templating';

import './Signup.html';


Template.signup.events({

	'submit form'(event){

		event.preventDefault();

		const email    = event.target.email.value;
		const password = event.target.password.value;

		console.log(email, password);
		console.log(event);

		Meteor.call('account.create.submit', {email, password}, (errorResponse) => {

			if(errorResponse){

				console.log(errorResponse.error);

			}

		});

	}

});
