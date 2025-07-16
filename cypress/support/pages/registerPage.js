const SELECTORS = {
    registerLink: 'Register',
    firstNameInput: '#firstName',
    lastNameInput: '#lastName',
    emailInput: '#email',
    phoneInput: '#phone',
    passwordInput: '#password',
    confirmPasswordInput: '#confirmPassword',
    registerButton: '.button',
    alertMessage: '.alert',
    firstNameError:
        '.gutter-xs-1 > :nth-child(1) > .form-group > .invalid-feedback',
    lastNameError:
        '.gutter-xs-1 > :nth-child(2) > .form-group > .invalid-feedback',
    emailError: ':nth-child(2) > .invalid-feedback',
    phoneError: ':nth-child(3) > .invalid-feedback',
    passwordError:
        ':nth-child(4) > :nth-child(1) > .form-group > .invalid-feedback',
    confirmPasswordError:
        ':nth-child(4) > :nth-child(2) > .form-group > .invalid-feedback',
};

const Massage = {
    requiredFirstName: 'First name is a required field',
    requiredLastName: 'Last name is a required field',
    requiredEmail: 'Email address is a required field',
    requiredPhone: 'Phone number is a required field',
    requiredPassword: 'Password is a required field',
    requiredConfirmPassword: 'Confirm password is a required field',
    invalidPhone: 'Phone is invalid format',
    phoneCustom: 'custom.phone',
    shortPassword: 'Password must be at least 8 characters',
    passwordMismatch: 'Confirm password must match with password',
    registrationSuccess:
        'Thank you for registering, We have sent a confirmation link to ${email}, please check your inbox / spam folder',
};

class RegisterPage {
    visitRegisterPage() {
        cy.visit('/');
        cy.contains('Register').click();
        //cy.get(SELECTORS.registerLink).click();
        cy.url().should('include', '/account/register');
    }

    assertRequiredFieldErrorMessage() {
        cy.get(SELECTORS.firstNameError)
            .should('be.visible')
            .and('contain', Massage.requiredFirstName);
        cy.get(SELECTORS.lastNameError)
            .should('be.visible')
            .and('contain', Massage.requiredLastName);
        cy.get(SELECTORS.emailError)
            .should('be.visible')
            .and('contain', Massage.requiredEmail);
        cy.get(SELECTORS.phoneError)
            .should('be.visible')
            .and('contain', Massage.phoneCustom);
        cy.get(SELECTORS.passwordError)
            .should('be.visible')
            .and('contain', Massage.shortPassword);
        cy.get(SELECTORS.confirmPasswordError)
            .should('be.visible')
            .and('contain', Massage.requiredConfirmPassword);
        cy.screenshot('Register Required Field Error Page', {
            capture: 'fullPage',
        });
    }

    assertPhoneErrorMessage() {
        cy.get(SELECTORS.phoneError)
            .should('be.visible')
            .and('contain', 'Phone is invalid format');
        cy.screenshot('Register Phone Error Page', { capture: 'fullPage' });
    }

    assertRegistrationSuccessMessage(email) {
        cy.get(SELECTORS.alertMessage)
            .should('be.visible')
            .and(
                'contain',
                `Thank you for registering, We have sent a confirmation link to ${email}, please check your inbox / spam folder`
            );
        cy.screenshot('Register Success Page', { capture: 'fullPage' });
    }

    assertEmailErrorMessage() {
        cy.get(SELECTORS.emailError)
            .should('be.visible')
            .and('contain', 'Email address is a required field');
        cy.screenshot('Register Email Error Page', { capture: 'fullPage' });
    }

    assertInvalidEmailFormatErrorMessage() {
        cy.get('#email').then(($input) => {
            expect($input[0].validationMessage).to.contain(
                "Please include an '@' in the email address. 'cypressqaseio15gmail.com' is missing an '@'."
            );
            cy.screenshot('Register Invalid Email Format Page', {
                capture: 'fullPage',
            });
        });
    }

    assertShortPasswordErrorMessage() {
        cy.get(SELECTORS.passwordError)
            .should('be.visible')
            .and('contain', 'Password must be at least 8 characters');
        cy.screenshot('Register Short Password Page', { capture: 'fullPage' });
    }

    assertRequiredConfirmPasswordMessage() {
        cy.get(SELECTORS.confirmPasswordError)
            .should('be.visible')
            .and('contain', 'Confirm password must match with password');
        cy.screenshot('Register Required Confirm Password Page', {
            capture: 'fullPage',
        });
    }

    assertRequiredPasswordMismatchMessage() {
        cy.get(SELECTORS.confirmPasswordError)
            .should('be.visible')
            .and('contain', 'Confirm password must match with password');
        cy.screenshot('Register Password Mismatch Page', {
            capture: 'fullPage',
        });
    }

    typeFirstName(firstName) {
        if (firstName) {
            cy.slowType(SELECTORS.firstNameInput, firstName);
        }
        return this;
    }

    typeLastName(lastName) {
        if (lastName) {
            cy.slowType(SELECTORS.lastNameInput, lastName);
        }
        return this;
    }

    typeEmail(email) {
        if (email) {
            cy.slowType(SELECTORS.emailInput, email);
        }
        return this;
    }

    typePhone(phone) {
        if (phone) {
            cy.slowType(SELECTORS.phoneInput, phone);
        }
        return this;
    }

    typePassword(password) {
        if (password) {
            cy.slowType(SELECTORS.passwordInput, password);
        }
        return this;
    }

    typeConfirmPassword(confirmPassword) {
        if (confirmPassword) {
            cy.slowType(SELECTORS.confirmPasswordInput, confirmPassword);
        }
        return this;
    }

    clickRegisterButton() {
        cy.get(SELECTORS.registerButton).click();
        return this;
    }
}

export default new RegisterPage();
