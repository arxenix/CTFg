/**
 * Created by Ankur on 5/24/2016.
 */
Template.team.helpers({
    team: function() {
        return Teams.findOne({_id: this._id});
    },
    progressChart: function() {
        var team = Teams.findOne({_id: this._id});
        if(team) {
            return getProgressChart(Problems.find({}).fetch(), team);
        }
    },
    timeChart: function() {
        var team = Teams.findOne({_id: this._id});
        if(team) {
            return getTimeChart(team);
        }
    }
});

