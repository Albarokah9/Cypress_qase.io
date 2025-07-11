/// <reference types="cypress" />
import { qase } from 'cypress-qase-reporter/mocha';
import LoginPage from '../../support/pages/loginPage';

describe('Login Test Suite', () => {
    beforeEach(function () {
        cy.fixture('loginData.json').as('userData');
        LoginPage.visitHome();
    });

    qase(
        1,
        it('TC_LOGIN_01 - Login dengan kredensial benar', function () {
            const { email, password } = this.userData.validUser;

            LoginPage.typeEmail(email)
                .typePassword(password)
                .clickLogin()
                .assertUserIsLoggedIn();
        })
    );

    qase(
        2,
        it('TC_LOGIN_02 - Login dengan menekan tombol Enter di di keyboard setelah menginput email dan password ', function () {
            const { email, password } = this.userData.validUser;

            LoginPage.typeEmail(email)
                .pressEnterOnPassword(password)
                .assertUserIsLoggedIn();
        })
    );

    qase(
        3,
        it('TC_LOGIN_03 - Login dengan password salah', function () {
            const { email, password } = this.userData.invalidPassword;

            LoginPage.typeEmail(email)
                .typePassword(password)
                .clickLogin()
                .assertInvalidCredentialsMessage();
        })
    );

    qase(
        4,
        it('TC_LOGIN_04 - Login menggunkan email yang salah', function () {
            const { email, password } = this.userData.invalidEmail;

            LoginPage.typeEmail(email)
                .typePassword(password)
                .clickLogin()
                .assertInvalidCredentialsMessage();
        })
    );

    qase(
        5,
        it('TC_LOGIN_05 - Login menggunakan email & password yang salah', function () {
            const { email, password } = this.userData.invalidEmailAndPassword;

            LoginPage.typeEmail(email)
                .typePassword(password)
                .clickLogin()
                .assertInvalidCredentialsMessage();
        })
    );

    qase(
        6,
        it('TC_LOGIN_06 - Login Mengunkan format email tidal valid', function () {
            const { email, password } = this.userData.incorrectEmailFormat;

            LoginPage.typeEmail(email)
                .typePassword(password)
                .clickLogin()
                .asserInvalidEmailFormatMessage();
        })
    );

    qase(
        7,
        it('TC_LOGIN_07 - Login tanpa mengisi kolom email', function () {
            const { password } = this.userData.emptyEmail;

            LoginPage.typePassword(password)
                .clickLogin()
                .assertRequiredEmailMessage();
        })
    );

    qase(
        8,
        it('TC_LOGIN_08 - Login tanpa mengisi kolom password', function () {
            const { email } = this.userData.emptyPassword;

            LoginPage.typeEmail(email)
                .clickLogin()
                .assertRequiredPasswordMessage();
        })
    );

    qase(
        9,
        it('TC_LOGIN_09 - Login tana mengisi field email & password', function () {
            const { email, password } = this.userData.emptyFields;

            LoginPage.typeEmail(email)
                .typePassword(password)
                .clickLogin()
                .assertBothFieldsRequiredMessage();
        })
    );

    qase(
        10,
        it('TC_LOGIN_10 - Memastikan karakter password dimasukkan sebagai titik/bintang', function () {
            const { password } = this.userData.validUser;

            LoginPage.typePassword(password).assertPasswordMasked();
        })
    );

    qase(
        11,
        it('TC_LOGIN_11 - Login meski belum verifikasi email', function () {
            const { unverifiedAccount } = this.userData;

            LoginPage.typeEmail(unverifiedAccount.email)
                .typePassword(unverifiedAccount.password)
                .clickLogin()
                .assertUserIsLoggedIn();
        })
    );
    afterEach(() => {
        cy.clearCookies();
    });
});
