Meteor.publish("scoreboard", function () {
    return Teams.find({}, {
        fields: {score: 1, name: 1, school: 1, eligible: 1, solves: 1}
    });
});

Meteor.publishComposite('team', {
    find: function() {
        return Meteor.users.find({_id: this.userId});
    },
    children: [
        {
            find: function(user) {
                if(user.profile && user.profile.team)
                    return Teams.find({_id: user.profile.team});
                else return null;
            },
            children: [
                {
                    find: function(team) {
                        return Meteor.users.find({_id: {$in: team.members}}, {fields: {username: 1}});
                    }
                }
            ]
        }
    ]
});

Meteor.publishComposite('teamId', function(teamId) {
    return {
        find: function() {
            return Teams.find({_id: teamId});
        },
        children: [
            {
                find: function(team) {
                    return Meteor.users.find({_id: {$in: team.members}}, {fields: {username: 1}});
                }
            }
        ]
    }
});

Meteor.publish('allProblems', function() {
    if(Date.now() > Meteor.settings.public.startTime) {
        return Problems.find({}, {fields: {id: 1, name: 1, category: 1, points: 1, type: 1, requirements: 1}});
    }
    /*else {
        //return number in each category
        return Problems.find({}, {fields: {id: 1, name: 0, category: 1, points: 0, solvers: 0, requirements: 0}});
    }*/
});

Meteor.publishComposite('unlockedProblems', {
    find: function() {
        if(Date.now() > Meteor.settings.public.startTime) {
            return Meteor.users.find({_id: this.userId});
        }
    },
    children: [
        {
            find: function(user) {
                return Teams.find({_id: user.profile.team});
            },
            children: [
                {
                    find: function(team) {
                        return team.getUnlockedProblems({fields: {grader: 0}});
                    }
                }
            ]
        }
    ]
});

Meteor.publishComposite('programmingSubmissions', {
    find: function() {
        return Meteor.users.find({_id: this.userId});
    },
    children: [
        {
            find: function(user) {
                return ProgrammingSubmissions.find({team: user.profile.team}, {fields: {submitTime: 1, result: 1, problem: 1, team: 1}});
            }
        }
    ]
});

Meteor.publish('updates', function() {
    var date = new Date();
    return Updates.find({time: {$lte: date}});
});