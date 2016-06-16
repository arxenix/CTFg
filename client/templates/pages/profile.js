/**
 * Created by Ankur on 5/21/2016.
 */
Template.profile.helpers({
    team: function() {
        return Teams.findOne({});
    },
    progressChart: function() {
        var team = Teams.findOne({});
        if(team) {
            return getProgressChart(Problems.find({}).fetch(), team);
        }
    },
    timeChart: function() {
        var team = Teams.findOne({});
        if(team) {
            return getTimeChart(team);
        }
    }
});

Template.profile.events({
    /* Create a team */
    'submit #createForm': function(e) {
        e.preventDefault();
        var teamName = e.currentTarget.inputTeamName.value;
        Meteor.call('createTeam', teamName, function(err, data) {
            if(err) {
                console.log(err);
                Session.set("error", err.reason);
            }
            else {
                console.log(data);
                Session.set("success", data.message);
            }
        });
    },
    /* Join a team via its code */
    'submit #joinForm': function(e) {
        e.preventDefault();
        var teamCode = e.currentTarget.inputTeamCode.value;
        Meteor.call('joinTeam', teamCode, function(err, data) {
            if(err) {
                console.log(err);
                Session.set("error", err.reason);
            }
            else {
                console.log(data);
                Session.set("success", data.message);
            }
        });
    },
    /* Set school name */
    'submit #setSchoolForm': function(e) {
        e.preventDefault();
        var schoolName = e.currentTarget.inputSchoolName.value;
        console.log("setting school name...");
        Meteor.call('setSchoolName', schoolName, function(err, data) {
            if(err) {
                console.log(err);
                Session.set("error", err.reason);
            }
            else {
                console.log(data);
                Session.set("success", data.message);
            }
        });
    },
    /* Join a class */
    'submit #joinClassForm': function(e) {
        e.preventDefault();
        var classCode = e.currentTarget.inputClassCode.value;
        console.log("joining class...");
        Meteor.call("joinClass", classCode, function(err, data) {
            if(err) {
                console.log(err);
                Session.set("error", err.reason);
            }
            else {
                console.log(data);
                Session.set("success", data.message);
            }
        });
    },
    /* Generate a new team code */
    'click #buttonNewCode': function() {
        Meteor.call('newTeamCode', function(err, data) {
            if(err) {
                console.log(err);
                Session.set("error", err.reason);
            }
            else {
                console.log(data);
                Session.set("success", data.message);
            }
        });
    }
});

Template.profile.onRendered(function(){
    /* Show tooltips */
    $('[data-toggle="tooltip"]').tooltip();
});