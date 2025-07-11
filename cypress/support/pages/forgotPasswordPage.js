const SELECTORS = {
    loginLink: '.d-inline-flex > [href="/account/login"] > u',
    forgotPasswordLink: '.d-flex > a > u',
    emailInput: '.form-control',
    submitButton: '.btn',
    instructionText: '.col-md-6 > .text-muted',
    successMessage: '.mb-3',
    toastMessage: '.react-toast-notifications__toast__content',
    invalidFeedback: '.invalid-feedback',
};

class ForgotPasswordPage {
    visitHome() {
        cy.visit('/');
        return this;
    }

    clickLoginLink() {
        cy.get(SELECTORS.loginLink).click();
        return this;
    }

    clickForgotPasswordLink() {
        cy.get(SELECTORS.forgotPasswordLink).click();
        return this;
    }

    verifyInstructionText() {
        cy.get(SELECTORS.instructionText)
            .should('be.visible')
            .and(
                'contain',
                'Enter the e-mail address associated with your account. Click submit to have a password reset link e-mailed to you.'
            );
        return this;
    }

    typeEmail(email) {
        cy.slowType(SELECTORS.emailInput, email);
        return this;
    }

    clickSubmitButton() {
        cy.get(SELECTORS.submitButton).click();
        return this;
    }

    verifySuccessMessage() {
        cy.get(SELECTORS.successMessage)
            .should('be.visible')
            .and(
                'contain',
                'Check your email for a link to reset your password. If it doesn’t appear within a few minutes, check your spam folder.'
            );
        cy.screenshot('Forgot Password Success Page', { capture: 'fullPage' });
        return this;
    }

    verifyEmailNotFoundMessage(email) {
        cy.get(SELECTORS.toastMessage)
            .should('be.visible')
            .and('contain', `Email: ${email} not found!`);
        cy.screenshot('Forgot Password verify Email Not Found Page', {
            capture: 'fullPage',
        });
        return this;
    }

    verifyInvalidEmailFormatMessage() {
        cy.get(SELECTORS.invalidFeedback)
            .should('be.visible')
            .and('contain', 'Email address must be a valid email');
        cy.screenshot('Forgot Password Invalid Email Format Page', {
            capture: 'fullPage',
        });
        return this;
    }

    verifyRequiredEmailMessage() {
        cy.get(SELECTORS.invalidFeedback)
            .should('be.visible')
            .and('contain', 'Email address is a required field');
        cy.screenshot('Forgot Password Required Email Page', {
            capture: 'fullPage',
        });
        return this;
    }
}

export default new ForgotPasswordPage();
