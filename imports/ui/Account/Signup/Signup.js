import {Template} from 'meteor/templating';
import {FlowRouter} from 'meteor/ostrio:flow-router-extra';
import {Log} from 'meteor/logging'

import './Signup.html';

Template.signup.events({

	'submit form'(event){

		event.preventDefault();

		const email    = event.target.email.value;
		const password = event.target.password.value;

		Meteor.call('account.signup.submit', {email, password}, (errorResponse) => {

			if(errorResponse){

				Log(errorResponse);

				return;

			}

			FlowRouter.go('signin');

		});

	}

});
