/**
 * Created by Ankur on 11/17/2015.
 */
var pwd = AccountsTemplates.removeField('password');
var email = AccountsTemplates.removeField('email');

AccountsTemplates.addFields([
    {
        _id: "username",
        type: "text",
        displayName: "Username",
        required: true,
        minLength: 5
    },
    email,
    pwd
]);

AccountsTemplates.addField({
    _id: "fullname",
    type: "text",
    displayName: "Your full name",
    placeholder: {
        signUp: "Full Name"
    },
    required: true,
    minLength: 4
});

AccountsTemplates.addField({
    _id: "type",
    type: "select",
    displayName: "Who are you?",
    required: true,
    select: [
        {
            text: "US Middle School Student",
            value: "middle"
        }, {
            text: "US High School Student",
            value: "high"
        }, {
            text: "US Middle/High School Teacher",
            value: "teacher"
        }, {
            text: "Non-US/Non-Student/Observer",
            value: "observer"
        }
    ]
});

AccountsTemplates.addField({
    _id: "mailing",
    type: "checkbox",
    displayName: "Subscribe me to the mailing list (get updates and notifications about future CTFs)",
    required: true
});

AccountsTemplates.configure({
    // Behavior
    confirmPassword: true,
    enablePasswordChange: true,
    forbidClientAccountCreation: false,
    overrideLoginErrors: true,
    sendVerificationEmail: true,
    //enforceEmailVerification: true,
    lowercaseUsername: false,
    focusFirstInput: true,

    // Appearance
    showAddRemoveServices: false,
    showForgotPasswordLink: true,
    showLabels: true,
    showPlaceholders: true,
    showResendVerificationEmailLink: true,

    // Client-side Validation
    continuousValidation: true,
    negativeFeedback: false,
    negativeValidation: true,
    positiveValidation: true,
    positiveFeedback: true,
    showValidating: true
});

AdminConfig = {
    name: 'CTFg',
    adminEmails: ['admin@ctfg.com'],
    collections: {
        Teams: {
            icon: 'users',
            tableColumns: [
                { label: 'Name', name: 'name' }
            ],
            color: 'purple'
        },
        Problems: {
            icon: 'code',
            tableColumns: [
                { label: 'Id', name: 'id' },
                { label: 'Name', name: 'name' }
            ],
            color: 'red'
        },
        Updates: {
            icon: 'pencil',
            tableColumns: [
                {label: 'Title', name: 'title'},
                {label: 'Time', name:'time'}
            ],
            color: 'yellow'
        }
    },
    skin: 'green'
};