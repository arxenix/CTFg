/**
 * Created by Ankur on 5/22/2016.
 */
Classes = new Mongo.Collection("classes");
ClassSchema = new SimpleSchema({
    name: {
        type: String,
        label: "Class name"
    },
    teacher: {
        type: String,
        label: "Teacher user ID"
    },
    teams: {
        type: [String],
        label: "Team IDs in the class"
    },
    code: {
        type: String,
        autoValue: function() {
            if (this.isInsert) {
                return "class"+Random.id(32);
            } else if (this.isUpsert) {
                return {$setOnInsert: "class_"+Random.id(32)};
            } else {
                this.unset();  // Prevent user from supplying their own value
            }
        }
    }
});
Classes.attachSchema(ClassSchema);
Classes.helpers({
    getTeams() {
        return Teams.find({_id: {$in: this.teams}});
    },
    getTeacher() {
        return Users.findOne({_id: this.teacher});
    }
});