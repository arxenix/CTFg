/**
 * Created by Ankur on 11/11/2015.
 */
Template.navbar.events({
    /* Logout */
   'click #logoutButton': function() {
       AccountsTemplates.logout();
   }
});

Template.classroom.events({
    /* Create a classroom */
    'submit #createClassForm': function(e) {
        e.preventDefault();
        var className = e.currentTarget.inputClassName.value;
        Meteor.call('createClass', className, function(err, data) {
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

Template.promo.onRendered(function(){
    /*var currentDate = Date.now();
    if(currentDate > Meteor.settings.public.startTime) {
        if(currentDate < Meteor.settings.public.endTime) {
            $("#competition-countdown").countdown(new Date(Meteor.settings.public.endTime), function(event) {
                $(this).html("<h2>Competition ends in:</h2> "+event.strftime('%D day%!D %H hour%!H %M minute%!M %S second%!S'));
            });
        }
        else {
            $("#competition-countdown").text("Competition over! See you next year.");
        }
    }
    else {
        $("#competition-countdown").countdown(new Date(Meteor.settings.public.startTime), function(event) {
            $(this).html("<h2>Competition starts in:</h2> "+event.strftime('%D day%!D %H hour%!H %M minute%!M %S second%!S'));
        });
    }*/

});

Template.solversList.events({
    'click .team-link': function() {
        bootbox.hideAll();
    }
});