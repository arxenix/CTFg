Template.navbar.events({
    /* Logout */
   'click #logoutButton': function() {
       AccountsTemplates.logout();
   }
});

Template.solversList.events({
    'click .team-link': function() {
        bootbox.hideAll();
    }
});