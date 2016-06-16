Template.problemPanel.helpers({
    hasSolved(probId) {
        var team = Teams.findOne({});
        if(team) {
            return team.hasSolved(probId);
        }
    }
});

Template.problemPanel.events({
    /* Submit an answer to a problem */
    'submit .submit-answer-form': function(e) {
        e.preventDefault(); // Don't submit it!
        var id = parseInt(event.target.getAttribute('id').split("\-")[2]);
        Meteor.call('submitAnswer', id, event.target.answer.value, function(err, data) {
            if(err) {
                console.log(err);
                Session.set("error", err.reason);
            }
            else {
                console.log(data);
                if(data.correct) {
                    console.log("correct");
                    Session.set("success", data.message);
                    $('#panel-body-'+id).collapse('hide');
                    $('#panel-footer-'+id).collapse('hide');
                    $('#submit-problem-'+id)[0].reset();
                }
                else {
                    Session.set("warning", data.message);
                }
            }
        });
    },
    /* Show teams that have solved a problem */
    'click .solvers-list': function(e) {
        e.preventDefault();
        var id = parseInt(e.currentTarget.getAttribute('id').split("\-")[2]);

        console.log("test");
        //var team = Meteor.user().getTeam();
        var problem = Problems.findOne({id: id});
        if(problem.getSolvers().fetch().length>0) {
            //TODO Make it display a table that includes whether the team is eligible and show time solved...
            bootbox.dialog({
                title: "Solvers of <b>"+problem.name+"</b>:",
                message: "<div id='solversListDialog'></div>",
                onEscape: function(){},
                backdrop: true
            });
            Blaze.renderWithData(Template.solversList,problem,$("#solversListDialog")[0]);
        }
    },

    /* Show problem requirements */
    'click .panel-title-link': function(e) {
        e.preventDefault();
        var id = parseInt(e.currentTarget.getAttribute('href').split("\-")[2]);
        var problem = Problems.findOne({id: id});
        if(problem.requirements && problem.requirements.length>0) {
            var list = "";
            problem.requirements.forEach(function(probId) {
                list+="<li>"+ Problems.findOne({id:probId}).name +"</li>"
            });
            bootbox.dialog({
                title: "Solve the following problems to unlock <b>"+problem.name+"</b>:",
                message: "<ul>"+list+"</ul>",
                onEscape: function(){},
                backdrop: true
            });
        }
    }
});