const SELECTORS = {
    emailInput: '#input-email',
    passwordInput: '#input-password',
    loginButton: '.btn',
    dropdown: '.dropdown',
    dropdownMenu: '.dropdown-menu',
    logoutButton: '.dropdown-menu > :nth-child(5)',
    loginLink: '.d-inline-flex > [href="/account/login"] > u',
};

class LogoutPage {
    visitHomePage() {
        cy.visit('/');
        cy.get(SELECTORS.loginLink).click();
        return this;
    }

    login(email, password) {
        cy.get(SELECTORS.emailInput).type(email);
        cy.get(SELECTORS.passwordInput).type(password);
        cy.get(SELECTORS.loginButton).click();
        return this;
    }

    logout() {
        cy.get(SELECTORS.dropdown).click();
        cy.get(SELECTORS.dropdownMenu, { timeout: 10000 }).should('be.visible');
        cy.get(SELECTORS.logoutButton).click();
        return this;
    }

    assertUserIsLoggedIn() {
        cy.get(SELECTORS.dropdown).should('be.visible');
        return this;
    }

    assertUserLogout() {
        cy.url().should('eq', 'https://soapleasure.com/');
        cy.screenshot('Logout Success', { capture: 'fullPage' });
        return this;
    }
}

export default new LogoutPage();
