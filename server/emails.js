/*Accounts.emailTemplates.siteName = "CTFg";
Accounts.emailTemplates.from     = "CTFg <admin@ctfg.com>";

Accounts.emailTemplates.verifyEmail = {
    subject() {
        return "[CTFg] Verify Your Email Address";
    },
    text( user, url ) {
        let emailAddress   = user.emails[0].address,
            urlWithoutHash = url.replace( '#/', '' ),
            supportEmail   = "contact@ctfg.com",
            emailBody      = `To verify your email address (${emailAddress}) visit the following link:\n\n${urlWithoutHash}\n\n If you did not request this verification, please ignore this email. If you feel something is wrong, please contact our support team: ${supportEmail}.`;

        return emailBody;
    }
};*/