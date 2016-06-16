/* Prevent users from editing profile properties */
Meteor.users.deny({
    update: function() {
        return true;
    }
});

Meteor.startup(function () {
    console.log("Starting server...");
    console.log("Loading problems...");
    Meteor.settings.problems.forEach(function(prob){
        if(!Problems.findOne({id: prob.id})) {
            Problems.insert(prob);
            console.log("Added problem id: "+prob.id);
        }
    });
    console.log("Loaded "+Problems.find().count()+" problems.");
});

Meteor.rootPath = Npm.require('path').resolve('.').split('.meteor')[0];