/// <reference types="cypress" />
import { qase } from 'cypress-qase-reporter/mocha';
import LogoutPage from '../../support/pages/logoutPage';

describe('Logout Test', () => {
    qase(
        1,
        it('TC_LOGOUT_01 - Memverifikasi fungsionalitas logout pengguna', function () {
            cy.fixture('loginData.json').then(function (userData) {
                const { email, password } = userData.validUser;

                LogoutPage.visitHomePage()
                    .login(email, password)
                    .assertUserIsLoggedIn()
                    .logout()
                    .assertUserLogout();
            });
        })
    );

    afterEach(() => {
        cy.clearCookies();
    });
});
