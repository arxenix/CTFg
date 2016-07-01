Problems = new Mongo.Collection("problems");

/*ProblemSolveSchema = new SimpleSchema({
    id: {
        type: String,
        label: "Solve team ID"
    },
    name: {
        type: String,
        label: "Solve team name"
    },
    eligible: {
        type: Boolean,
        label: "Solve team eligibility"
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
});*/

ProblemSchema = new SimpleSchema({
    id: {
        type: Number,
        label: "Problem ID"
    },
    type: {
        type: String,
        label: "Problem type",
        defaultValue: "short_answer",
        allowedValues: ["short_answer","programming"],
        autoform: {
            options: {
                short_answer: "Short Answer",
                programming: "Programming"
            }
        }
    },
    name: {
        type: String,
        label: "Name"
    },
    description: {
        type: String,
        label: "Description (markdown-enabled)",
        autoform: {
            afFieldInput: {
                type: "textarea",
                rows: 10
            }
        }
    },
    hint: {
        type: String,
        label: "Hint (markdown-enabled)",
        optional: true,
        autoform: {
            afFieldInput: {
                type: "textarea",
                rows: 10
            }
        }
    },
    category: {
        type: String,
        label: "Category"
    },
    points: {
        type: Number,
        label: "Points"
    },
    grader: {
        type: String,
        label: "Path to grader script"
    },
    requirements: {
        type: [Number],
        label: "Required solve IDs",
        optional: true
    },
    allowedLanguages: {
        type: [String],
        allowedValues: ["python/2", "python/latest", "java/latest", "clang/latest", "ruby/latest", "javascript/latest", "perl/latest"],
        label: "Allowed languages to submit",
        optional: true,
        autoform: {
            options: {
                "python/2": "Python 2",
                "python/latest": "Python 3",
                "java/latest": "Java",
                "clang/latest": "C++",
                "ruby/latest": "Ruby",
                "javascript/latest": "JavaScript",
                "perl/latest": "Perl"
            },
            afFieldInput: {
                type: "select-checkbox"
            }
        }
    }/*,
    solvers: {
        type: [ProblemSolveSchema],
        label: "Problem Solves",
        optional: true
    }*/
});
Problems.attachSchema(ProblemSchema);
Problems.helpers({
    getSolvers() {
        return Teams.find({solves: {$elemMatch: {id: this.id}}});
    },
    isProgramming() {
        return this.type==='programming';
    },
    isShortAnswer() {
        return this.type==='short_answer';
    }
});