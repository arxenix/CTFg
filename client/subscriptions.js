/**
 * Created by Ankur on 11/18/2015.
 */
Template.classroom.onCreated(function() {
    var self = this;
    self.autorun(function() {
        if(Meteor.user().profile.type==='teacher')
            self.subscribe("classes");
    });
});