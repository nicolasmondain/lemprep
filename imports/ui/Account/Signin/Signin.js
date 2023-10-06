import {Template} from 'meteor/templating';
import {FlowRouter} from 'meteor/ostrio:flow-router-extra';
import {Log} from 'meteor/logging'


import './Signin.html';

Template.signin.events({

	'submit form'(event){

		event.preventDefault();

		const email    = event.target.email.value;
		const password = event.target.password.value;

		const user = Meteor.loginWithPassword(email, password, (errorResponse) => {

			if(errorResponse){

				Log(errorResponse);

				return;

			}

			FlowRouter.go('campaigns');

		});

		Log(user);

	}

});
