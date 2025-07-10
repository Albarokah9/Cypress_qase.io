const SELECTORS = {
    loginLink: '.d-inline-flex > [href="/account/login"] > u',
    emailInput: '#input-email',
    passwordInput: '#input-password',
    loginButton: '.btn',
    dropdown: '.dropdown',
    alertMessage: '.alert',
    invalidFeedback: '.invalid-feedback',
  };
  class LoginPage {
    visitHome() {
      cy.visit('/');
      cy.get(SELECTORS.loginLink).click();
      cy.url().should('include', '/account/login');
    }
  
    // Hanya akan mengetik email jika nilainya tidak kosong
    // Mencegah error Cypress saat data kosong ("")
    // Memungkinkan pemanggilan method lain setelahnya (chaining)
    typeEmail(email) {
      if (email) {
        cy.slowType(SELECTORS.emailInput, email);
      }
      return this;
    }
  
    // Hanya akan mengetik password jika nilainya tidak kosong
    // Mencegah error Cypress saat data kosong ("")
    // Memungkinkan pemanggilan method lain setelahnya (chaining)
    typePassword(password) {
      if (password) {
        cy.slowType(SELECTORS.passwordInput, password);
      }
      return this;
    }
  
    // navigateToLoginPage() {
    //   cy.visit('/');
    //   cy.get(SELECTORS.loginLink).click(); // Gunakan selector dari data
    //   cy.url().should('include', '/account/login');
    // }
  
    pressEnterOnPassword(password) {
      cy.get(SELECTORS.passwordInput).type(`${password}{enter}`);
      return this;
    }
  
    clickLogin() {
      cy.get(SELECTORS.loginButton).click();
      return this;
    }
  
    assertUserIsLoggedIn() {
      cy.get(SELECTORS.dropdown, { timeout: 10000 }).should('be.visible');
      cy.screenshot("Login Success", { capture: 'fullPage' });
    }
  
    assertInvalidCredentialsMessage() {
      cy.get(SELECTORS.alertMessage).should('contain', 'Invalid email address or password');
      cy.screenshot("Login Failed with Invalid Credentials", { capture: 'fullPage' });
    }
  
    asserInvalidEmailFormatMessage() {
      cy.get(SELECTORS.invalidFeedback).should('contain', 'Please enter a valid email address');
      cy.screenshot("Login Failed with Invalid Email Format", { capture: 'fullPage' });
    }
  
    assertRequiredEmailMessage() {
      cy.get(SELECTORS.invalidFeedback).should('contain', 'Email address is required');
      cy.screenshot("Login Failed with Required Email", { capture: 'fullPage' });
    }
  
    assertRequiredPasswordMessage() {
      cy.get(SELECTORS.invalidFeedback).should('contain', 'Please enter your password');
      cy.screenshot("Login Failed with Required Password", { capture: 'fullPage' });
    }
  
    assertBothFieldsRequiredMessage() {
      cy.get(SELECTORS.invalidFeedback).eq(0).should('contain', 'Email address is required');
      cy.get(SELECTORS.invalidFeedback).eq(1).should('contain', 'Please enter your password');
      cy.screenshot("Login Failed with Both Fields Required", { capture: 'fullPage' });
    }
  
    assertPasswordMasked() {
      cy.get(SELECTORS.passwordInput).should('have.attr', 'type', 'password');
      cy.screenshot("Login with Password Masked", { capture: 'fullPage' });
    }
  }
  
  export default new LoginPage();