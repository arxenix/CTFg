Teams = new Mongo.Collection("teams");

TeamSolveSchema = new SimpleSchema({
    id: {
        type: Number,
        label: "Solved problem ID"
    },
    name: {
        type: String,
        label: "Solved problem name"
    },
    points: {
        type: Number,
        label: "Points"
    },
    time: {
        type: Date,
        label: "Solve time",
        autoform: {
            afFieldInput: {
                type: "bootstrap-datetimepicker"
            }
        }
    }
});

TeamMemberSchema = new SimpleSchema({
    id: {
        type: String,
        label: "Team member id"
    },
    name: {
        type: String,
        label: "Team member name"
    },
    eligible: {
        type: Boolean,
        label: "Team member eligibility"
    }
});
TeamSchema = new SimpleSchema({
    name: {
        type: String,
        label: "Name",
        max: 100
    },
    score: {
        type: Number,
        label: "Score",
        min: 0
    },
    eligible: {
        type: Boolean,
        label: "Team Eligibility"
    },
    members: {
        type: [String],
        label: "Member IDs"
    },
    solves: {
        type: [TeamSolveSchema],
        label: "Solved problems",
        optional: true
    },
    school: {
        type: String,
        min: 5,
        max: 32,
        optional: true
    },
    code: {
        type: String,
        label: "Team join code",
        autoValue: function() {
            if (this.isInsert) {
                return "team_"+Random.id(32);
            } else if (this.isUpsert) {
                return {$setOnInsert: "team_"+Random.id(32)};
            } else {
                this.unset();  // Prevent user from supplying their own value
            }
        }
    },
    classId: {
        type: String,
        label: "Class ID",
        optional: true
    }
});
Teams.attachSchema(TeamSchema);
Teams.helpers({
    getMembers() {
        return Meteor.users.find({_id: {$in: this.members}});
    },
    getSolves() {
        return Problems.find({id: {$in: this.solves}});
    },
    getSolvedIds() {
        var solvedIds = [];
        if(this.solves)  {
            this.solves.forEach(function(prob) {
                solvedIds.push(prob.id);
            });
        }
        return solvedIds;
    },
    getClass() {
        if(this.classId)
            return Classes.findOne({_id: this.classId});
        else return null;
    },
    hasSolved: function(probId) {
        var solvedIds = [];
        if(this.solves)  {
            this.solves.forEach(function(prob) {
                solvedIds.push(prob.id);
            });
        }
        return solvedIds.indexOf(probId)>-1;
    },
    getUnlockedProblems(options = {}) {
        return Problems.find({requirements: {$not: {$elemMatch: {$nin: this.getSolvedIds()}}}}, options);
    },
    hasUnlocked(probId) {
        var unlocked = this.getUnlockedProblems().fetch();
        var ret = false;
        unlocked.forEach(function(prob) {
            if(prob.id===probId) ret = true;
        });
        return ret;
    },
    addSolve(problem) {
        var time = new Date();
        Teams.update(this._id, {$inc: {score: problem.points}, $push: {solves: {name: problem.name, points: problem.points, time: time, id: problem.id}      }});
    }
});