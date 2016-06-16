var submitAnswerRule = {
    userId: function (userId) {
        return !Roles.userIsInRole(userId, 'admin');
    },
    type: 'method',
    method: 'submitAnswer'
};

// Add the rule, allowing up to 1 answer every 5000 milliseconds.
DDPRateLimiter.addRule(submitAnswerRule, 3, 5000);

DDPRateLimiter.setErrorMessage("Rate limited!");