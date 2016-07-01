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
    },
    result: {
        type: Object,
        label: "Submission result"
    },
    "result.completed": {
        type: Boolean,
        label: "Has it finished processing?",
        optional: false
    },
    "result.stderr": {
        type: String,
        label: "Program error",
        optional: true
    },
    "result.error": {
        type: String,
        label: "Error message",
        optional: true
    },
    "result.stdout": {
        type: String,
        label: "Program output",
        optional: true
    },
    "result.correct": {
        type: Boolean,
        label: "Correct?",
        optional: true
    }
});
ProgrammingSubmissions.attachSchema(ProgrammingSubmissionSchema);