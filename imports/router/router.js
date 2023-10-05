import {FlowRouter} from 'meteor/ostrio:flow-router-extra';
import '../ui/Layout/Layout';

FlowRouter.route('/', {

  name: 'index',
	waitOn(){

    return [

      import('../ui/Header/Header'),
      import('../ui/Index/Index'),
			import('../ui/Footer/Footer')

    ];
  },
  action(){

		if(Meteor.userId()){

			FlowRouter.go('list');

			return;

		}else{

			this.render('layout', 'index', {

				header: 'header',
				footer: 'footer'

			});

		}

  }

});

const exposed = FlowRouter.group({

  prefix       : '/account',
  name         : 'group-account',
  triggersEnter: [(context, redirect) => {

    if(Meteor.userId()){

			FlowRouter.go('campaigns');

			return;

		}

  }]

});

exposed.route('/sign-in', {

  name: 'signin',
	waitOn(){

    return [

      import('../ui/Header/Header'),
      import('../ui/Account/Signin/Signin'),
			import('../ui/Footer/Footer')

    ];
  },
  action(){

		this.render('layout', 'signin', {

      header: 'header',
			footer: 'footer'

    });

  }

});

exposed.route('/sign-up', {

  name: 'signup',
  waitOn(){

    return [

      import('../ui/Header/Header'),
      import('../ui/Account/Signup/Signup'),
			import('../ui/Footer/Footer')

    ];
  },
  action(){

		this.render('layout', 'signup', {

      header: 'header',
			footer: 'footer'

    });

  }

});

const campaigns = FlowRouter.group({

  prefix       : '/campaigns',
  name         : 'group-campaigns',
  triggersEnter: [(context, redirect) => {

    if(!Meteor.userId()){

			FlowRouter.go('signin');

			return;

		}

  }]

});

campaigns.route('/list/', {

  name: 'list',
  waitOn(){

    return [

      import('../ui/Header/Header'),
      import('../ui/Campaigns/Campaigns'),
			import('../ui/Footer/Footer')

    ];
  },
  action(){

		this.render('layout', 'campaigns', {

      header: 'header',
			footer: 'footer'

    });

  }

});

campaigns.route('/:id', {

  name: 'campaign',
	waitOn(){

    return [

      import('../ui/Header/Header'),
      import('../ui/Campaigns/Campaign/Campaign'),
			import('../ui/Footer/Footer')

    ];
  },
  action(params, qs){

		this.render('layout', 'campaign', Object.assign({

      header: 'header',
			footer: 'footer'

    }, params, qs));

  }

});

campaigns.route('/create', {

  name: 'create',
  waitOn(){

    return [

      import('../ui/Header/Header'),
      import('../ui/Campaigns/Create/Create'),
			import('../ui/Footer/Footer')

    ];
  },
  action(){

		this.render('layout', 'create', {

      header: 'header',
			footer: 'footer'

    });

  }

});

FlowRouter.route('*', {

  action() {

		if(Meteor.userId()){

			FlowRouter.go('list');

			return;

		}else{

			FlowRouter.go('signin');

		}

  }

});
