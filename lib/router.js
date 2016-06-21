/**
 * Created by Ankur on 11/11/2015.
 */

Router.configure({
    layoutTemplate: 'applicationLayout',
    loadingTemplate: "loading",
    notFoundTemplate: "notFound"
});

Router.plugin('ensureSignedIn', {
    except: ['home', 'info', 'chat', 'updates', 'scoreboard', 'login', 'register']
});

Router.route('/', {
    name: 'home',
    action: function () {
        this.render('promo');
    },
    fastRender: true
});

Router.route('/info', {
    name: 'info',
    action: function() {
        this.render('info');
    },
    fastRender: true
});

Router.route('/chat', {
    name: 'chat',
    action: function () {
        this.render('chat');
    },
    fastRender: true
});

Router.route('/updates', {
    subscriptions: function() {
        return [Meteor.subscribe('updates')];
    },
    action: function() {
        if(this.ready())
            this.render();
        else this.render('loading');
    },
    fastRender: true
});

Router.route('/scoreboard',  {
    subscriptions: function() {
        return [Meteor.subscribe('scoreboard')];
    },
    action: function () {
        if (this.ready())
            this.render();
        else this.render('loading');
    },
    fastRender: true
});

Router.route('/team/:_id', {
    name: 'team',
    subscriptions: function() {
        return [Meteor.subscribe('teamId', this.params._id), Meteor.subscribe('allProblems')]
    },
    action: function() {
        if (this.ready())
            this.render();
        else this.render('loading');
    },
    data: function(){
        return {_id: this.params._id};
    },
    fastRender: true
});

/*Router.route('/verify-email:token', {
    name: 'verify-email',
    action: function() {
        var inst = this;
        Accounts.verifyEmail(this.params.token, ( error ) =>{
            if ( error ) {
                Session.set('error', 'Email verification failed!');
            } else {
                //this.redirect( '/' );
                Session.set('success', 'Email verified successfully!');
            }
            inst.redirect( '/' );
        });
    }
});*/

Router.route('/programming', {
    subscriptions: function() {
        return [Meteor.subscribe('unlockedProblems')];
        //return [Meteor.subscribe('team'), Meteor.subscribe('allProblems')];
    },
    action: function() {
        if (this.ready())
            this.render();
        else this.render('loading');
    },
    fastRender: true
});

function ensureHasTeam(context, redirect) {
    if(!Meteor.user() || !Meteor.user().profile.team) {
        redirect("/profile");
    }
}

function ensureEligible(context, redirect) {
    if(!Meteor.user()) {
        redirect("/login");
    }
    else if(Meteor.user().profile.type==="teacher") {
        redirect("/classroom");
    }
}

Router.route('/profile', {
    subscriptions: function() {
        return [Meteor.subscribe('team'), Meteor.subscribe('allProblems')];
    },
    action: function () {
        if (this.ready())
            this.render();
        else this.render('loading');
    },
    fastRender: true
});

Router.route('/problems', {
    subscriptions: function() {
        return [Meteor.subscribe('allProblems'), Meteor.subscribe('unlockedProblems')];
    },
    action: function() {
        if (this.ready())
            this.render();
        else this.render('loading');
    },
    fastRender: true
});

/*
FlowRouter.route('/classroom', {
    triggersEnter: [AccountsTemplates.ensureSignedIn, function(context, redirect) {
        if(Meteor.user()) {
            if(Meteor.user().profile.type!=="teacher") {
                redirect("/profile");
            }
        }
        else {
            redirect("/login");
        }
    }],
    action: function() {
        BlazeLayout.render("applicationLayout", {main: "classroom"});
    }
});

FlowRouter.notFound = {
    action: function() {
        BlazeLayout.render("applicationLayout", {main: "404"});
    }
};*/
AccountsTemplates.configureRoute('signIn', {
    name: 'login',
    path: '/login',
    template: 'login',
    layoutTemplate: 'applicationLayout'
});
AccountsTemplates.configureRoute('signUp', {
    name: 'register',
    path: '/register',
    template: 'register',
    layoutTemplate: 'applicationLayout'
});
AccountsTemplates.configureRoute('resendVerificationEmail', {
    name: 'send-again',
    path: '/send-again',
    template: 'fullPageAtForm',
    layoutTemplate: 'applicationLayout'
});
AccountsTemplates.configureRoute('verifyEmail', {
    name: 'verify-email',
    path: '/verify-email',
    template: 'verifyEmail',
    layoutTemplate: 'applicationLayout'
});
