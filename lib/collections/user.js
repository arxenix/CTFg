/**
 * Created by Ankur on 5/22/2016.
 */
UserProfileSchema = new SimpleSchema({
    fullname: {
        type: String,
        label: "Full name",
        optional: true
    },
    type: {
        type: String,
        label: "User role",
        optional: true
    },
    mailing: {
        type: Boolean,
        label: "Opt-in to emails",
        optional: false
    },
    team: {
        type: String,
        label: "Team ID",
        optional: true
    }
});

UserSchema = new SimpleSchema({
    username: {
        type: String,
        // For accounts-password, either emails or username is required, but not both. It is OK to make this
        // optional here because the accounts-password package does its own validation.
        // Third-party login packages may not require either. Adjust this schema as necessary for your usage.
        optional: true
    },
    emails: {
        type: Array,
        // For accounts-password, either emails or username is required, but not both. It is OK to make this
        // optional here because the accounts-password package does its own validation.
        // Third-party login packages may not require either. Adjust this schema as necessary for your usage.
        optional: true
    },
    "emails.$": {
        type: Object
    },
    "emails.$.address": {
        type: String,
        regEx: SimpleSchema.RegEx.Email
    },
    /*"emails.$.verified": {
        type: Boolean
    },*/
    // Use this registered_emails field if you are using splendido:meteor-accounts-emails-field / splendido:meteor-accounts-meld
    /*registered_emails: {
        type: [Object],
        optional: true,
        blackbox: true
    },*/
    createdAt: {
        type: Date
    },
    profile: {
        type: UserProfileSchema,
        optional: true
    },
    services: {
        type: Object,
        optional: true,
        blackbox: true
    },
    roles: {
        type: Object,
        optional: true,
        blackbox: true
    },
    heartbeat: {
        type: Date,
        optional: true
    }
});


Meteor.users.attachSchema(UserSchema);

Meteor.users.helpers({
   getTeam() {
       if(this.profile && this.profile.team) {
           return Teams.findOne({_id: this.profile.team})
       }
       else return null;
   }
});