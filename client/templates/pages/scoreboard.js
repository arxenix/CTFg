/**
 * Created by Ankur on 5/23/2016.
 */
Template.scoreboard.helpers({
    filterTeams: function(filter) {
        var teams;
        switch(filter) {
            case "eligible":
                teams = Teams.find({eligible: true}).fetch();
                break;
            case "all":
                teams = Teams.find({}).fetch();
                break;
            case "classroom":
                break;
        }
        if(teams)
            sortTeams(teams);
        return teams;
    },
    scoreboardChart: function(filter) {
        var amount = 5;
        var teams = [];
        if(filter==="eligible") {
            teams = Teams.find({eligible: true}).fetch();
        }
        else if(filter==="all") {
            teams = Teams.find({}).fetch();
        }
        else if(filter==="classroom") {

        }
        sortTeams(teams);
        if(teams.length>0) {
            return getScoreboardChart(teams, amount);
        }
    },
    getChartId: function(name) {
        return "scoreboardChart-"+name;
    },
    team: function() {
        return Teams.findOne({});
    },
    tabNames : ["eligible", "all", "classroom"]
});

Template.scoreboard.events({
    'shown.bs.tab': function(e) {
        console.log(e);
        var tab = e.target.attributes["href"].value.split("-")[1];
        console.log(tab);
        $('#scoreboardChart-'+tab).highcharts().reflow();
    }
    /*'click .clickable-row': function(e) {
     FlowRouter.go($(e.currentTarget).data("href"));
     }*/
});