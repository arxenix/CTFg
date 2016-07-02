/* Prevent users from editing profile properties */
Meteor.users.deny({
    update: function() {
        return true;
    }
});

Meteor.startup(function () {
    console.log("Starting server...");
    console.log("Loading problems...");
    var count = Problems.find({}).count();
    if(count===0) {
        Meteor.settings.problems.forEach(function(prob){
            Problems.insert(prob);
            console.log("Added problem id: "+prob.id);
            count++;
        });
    }
    console.log("Loaded "+count+" problems.");
});

Meteor.rootPath = Npm.require('path').resolve('.').split('.meteor')[0];