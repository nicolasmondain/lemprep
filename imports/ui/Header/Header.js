import {Template} from 'meteor/templating';
import {FlowRouter} from 'meteor/ostrio:flow-router-extra';

import './Header.html';

Template.header.helpers({

	isAuthenticated(){

		return Meteor.userId();

	}

});

Template.header.events({

	'click .logout'(event){

		event.preventDefault();

		Meteor.logout((errorResponse) => {

			if(errorResponse){

				console.log(errorResponse);

				return;

			}

			FlowRouter.go('signin');

		});

	}

});
