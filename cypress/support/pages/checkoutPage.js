const SELECTORS = {
    loginLink: '.d-inline-flex > [href="/account/login"] > u',
    emailInput: '#input-email',
    passwordInput: '#input-password',
    loginButton: '.btn',
    searchInput: 'input',
    cartButton: '.txt-chart',
    productName: '.name > a',
    addToCartButton: '.mt-2 > :nth-child(1)',
    buyNowButton: '.primary',
    addQuantity: '.icon_plus',
    checkoutButton: '.panel-body > :nth-child(2) > .btn',
    coldProcess: ':nth-child(1) > .category-menu',
};

class CheckoutPage {
    visitHomePage() {
        cy.visit('/');
    }

    typeSearchAsGuest() {
        cy.get(SELECTORS.searchInput).type(
            'Soapleasure Classic Brew Coffee Soap{enter}'
        );
        return this;
    }

    typeEmail() {
        cy.get(SELECTORS.emailInput).type('test@gmail.com');
        return this;
    }

    typePassword() {
        cy.get(SELECTORS.passwordInput).type('Cobatest');
        return this;
    }

    clickLogin() {
        cy.get(SELECTORS.loginLink).click();
        return this;
    }

    clickLoginButton() {
        cy.get(SELECTORS.loginButton).click();
        return this;
    }

    clickProduct() {
        cy.get(SELECTORS.productName).eq(0).click();
        return this;
    }

    clickColdProcessSoap() {
        cy.get(SELECTORS.coldProcess).click();
        cy.get('div.menu-dropdown--wrapper').should('be.visible');
        cy.contains('a', 'Essential Oil Soap').click({ force: true });
        cy.contains('SOAPLEASURE RECYCLE BLACK LEVEL LAVENDER SOAP').click();
        return this;
    }

    addToCart() {
        cy.get(SELECTORS.addToCartButton).click();
        return this;
    }

    buyNow() {
        cy.get(SELECTORS.buyNowButton).click();
        return this;
    }

    addQuantity() {
        cy.get(SELECTORS.addQuantity).click();
        return this;
    }

    checkout() {
        cy.get(SELECTORS.checkoutButton).click();
        return this;
    }

    assertProductAddedToCart() {
        cy.get('.react-toast-notifications__toast__content')
            .should('be.visible')
            .should('contain', 'Product has been added to your cart');
        cy.screenshot('Product Added to Cart', { capture: 'fullPage' });
        return this;
    }
}

export default new CheckoutPage();
