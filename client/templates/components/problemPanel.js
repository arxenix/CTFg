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
        var id = this.id;
        Meteor.call('submitAnswer', id, e.target.answer.value, function(err, data) {
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
    /* Submit an answer to a program */
    'submit .submit-program-form': function(e) {
        e.preventDefault(); // Don't submit it!
        if(this.programfile) {
            Meteor.call('submitProgram', this.id, this.programfile, "python/latest", function(err, data) {
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
        }
        else {
            Session.set("warning", "You must upload a program first");
        }
    },
    /* Show teams that have solved a problem */
    'click .solvers-list': function(e) {
        e.preventDefault();
        var id = parseInt(e.currentTarget.getAttribute('id').split("\-")[2]);

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
    },
    
    'change .program-input': function(e) {
        var instance = this;
        //e.preventDefault();
        console.log("Uploaded file!");
        // Check for the various File API support.
        if (window.File && window.FileReader && window.FileList && window.Blob) {
            if(e.target.files && e.target.files[0]) {
                var reader = new FileReader();
                reader.onload = function(e) {
                    var contents = e.target.result;
                    console.log(contents);
                    instance.programfile = contents;
                };
                reader.readAsText(e.target.files[0]);
            }
        } else {
            Session.set("warning", "File reading is not supported by your browser! Use the program editor instead.");
        }
    }
});
