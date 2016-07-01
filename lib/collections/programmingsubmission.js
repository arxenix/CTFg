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
    language: {
        type: String,
        label: "Program language",
        allowedValues: ["python/2", "python/latest", "java/latest", "clang/latest", "ruby/latest", "javascript/latest", "perl/latest"]
    },
    submitTime: {
        type: Date,
        label: "Submission time"
    }
});
ProgrammingSubmissions.attachSchema(ProgrammingSubmissionSchema);