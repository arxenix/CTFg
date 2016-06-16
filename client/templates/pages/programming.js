/**
 * Created by Ankur on 5/24/2016.
 */

var langMap = {
    "py2": "text/x-python",
    "py3": "text/x-python",
    "java": "text/x-java",
    "cpp": "text/c-c++src",
    "r": "text/x-rsrc",
    "perl": "text/x-perl",
    "js": "text/javascript"
};

Template.programming.events({
    /* Handle programming language changes */
    "change #select-language": function(e) {
        var newValue = e.currentTarget.value;
        var editor = $('.CodeMirror')[0].CodeMirror;
        if(newValue in langMap) {
            editor.setOption("mode", langMap[newValue]);
        }
    },
    "change #select-problem": function(e) {
        var newProblem = e.currentTarget.value;
        Session.set('selectedProblem', parseInt(newProblem));
        setTimeout(function() {
            CodeMirror.fromTextArea($("#programming-area").get(0), {
                lineNumbers: true,
                mode: "text/x-python" // set any of supported language modes here
            });
            $('#select-language').selectpicker();
        }, 100);
    }
});

Template.programming.onRendered(function() {
    Session.set('selectedProblem', null);
    /* Display programming editor */
    this.$('#select-problem').selectpicker();
});

Template.programming.helpers({
    programmingProblems() {
        return Problems.find({type: "programming"}, {sort: {id: 1}});
    },
    team() {
        return Teams.findOne({});
    },
    selectedProblem() {
        return Problems.findOne({id: Session.get('selectedProblem')});
    },
    hasSolved(probId) {
        var team = Teams.findOne({});
        if(team) {
            return team.hasSolved(probId);
        }
    }
});