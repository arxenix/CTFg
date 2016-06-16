ProgrammingSubmissions = new Mongo.Collection("programs");

ProgrammingSubmissionSchema = new SimpleSchema({
    problem: {
        type: Number,
        label: "Problem ID"
    },
    team: {
        type: String,
        label: "Team ID"
    },
    program: {
        type: String,
        label: "Program source code"
    },
    submitTime: {
        type: Date,
        label: "Submission time"
    }
});
ProgrammingSubmissions.attachSchema(ProgrammingSubmissionSchema);