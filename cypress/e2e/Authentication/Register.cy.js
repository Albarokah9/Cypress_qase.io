/// <reference types="cypress" />
import { qase } from 'cypress-qase-reporter/mocha';
import RegisterPage from '../../support/pages/registerPage';

describe('Register Test Suite', () => {
    beforeEach(function () {
        cy.fixture('registerData.json').as('userData');
        RegisterPage.visitRegisterPage();
    });

    // qase(
    //     12,
    //     it('TC_REG_01 - Berhasil membuat akun baru', function () {
    //         const {
    //             firstName,
    //             lastName,
    //             email,
    //             phone,
    //             password,
    //             confirmPassword,
    //         } = this.userData.validUser;

    //         RegisterPage.typeFirstName(firstName)
    //             .typeLastName(lastName)
    //             .typeEmail(email)
    //             .typePhone(phone)
    //             .typePassword(password)
    //             .typeConfirmPassword(confirmPassword)
    //             .clickRegisterButton()
    //             .assertRegistrationSuccessMessage(email);
    //     })
    // );

    // qase(
    //     13,
    //     it('TC_REG_02 - Register  dengan menggunakan kombinasi password huruf & angka', function () {
    //         const {
    //             firstName,
    //             lastName,
    //             email,
    //             phone,
    //             password,
    //             confirmPassword,
    //         } = this.userData.userWithAlphanumericPassword;

    //         RegisterPage.typeFirstName(firstName)
    //             .typeLastName(lastName)
    //             .typeEmail(email)
    //             .typePhone(phone)
    //             .typePassword(password)
    //             .typeConfirmPassword(confirmPassword)
    //             .clickRegisterButton()
    //             .assertRegistrationSuccessMessage(email);
    //     })
    // );

    // qase(
    //     14,
    //     it('TC_REG_03 - Register dengan konfirmasi password sama dengan password', function () {
    //         const {
    //             firstName,
    //             lastName,
    //             email,
    //             phone,
    //             password,
    //             confirmPassword,
    //         } = this.userData.userWithMatchingPasswords;

    //         RegisterPage.typeFirstName(firstName)
    //             .typeLastName(lastName)
    //             .typeEmail(email)
    //             .typePhone(phone)
    //             .typePassword(password)
    //             .typeConfirmPassword(confirmPassword)
    //             .clickRegisterButton()
    //             .assertRegistrationSuccessMessage(email);
    //     })
    // );

    // qase(
    //     15,
    //     it('TC_REG_04 - Verifikasi validasi error saat field email dikosongkan pada form registrasi', function () {
    //         const {
    //             firstName,
    //             lastName,
    //             email,
    //             phone,
    //             password,
    //             confirmPassword,
    //         } = this.userData.userWithEmptyEmail;

    //         RegisterPage.typeFirstName(firstName)
    //             .typeLastName(lastName)
    //             .typeEmail(email)
    //             .typePhone(phone)
    //             .typePassword(password)
    //             .typeConfirmPassword(confirmPassword)
    //             .clickRegisterButton()
    //             .assertEmailErrorMessage();
    //     })
    // );

    qase(
        16,
        it('TC_REG_05 - Verifikasi pesan error validasi ketika password yang dimasukkan kurang dari 8 karakter', function () {
            const {
                firstName,
                lastName,
                email,
                phone,
                password,
                confirmPassword,
            } = this.userData.userWithShortPassword;

            RegisterPage.typeFirstName(firstName)
                .typeLastName(lastName)
                .typeEmail(email)
                .typePhone(phone)
                .typePassword(password)
                .typeConfirmPassword(confirmPassword)
                .clickRegisterButton()
                .assertShortPasswordErrorMessage();
        })
    );

    qase(
        17,
        it('TC_REG_06 - Verifikasi pesan error validasi ketika field konfirmasi password dikosongkan pada form registrasi', function () {
            const { firstName, lastName, email, phone, password } =
                this.userData.userWithEmptyConfirmPassword;

            RegisterPage.typeFirstName(firstName)
                .typeLastName(lastName)
                .typeEmail(email)
                .typePhone(phone)
                .typePassword(password)
                .clickRegisterButton()
                .assertRequiredConfirmPasswordMessage();
        })
    );

    // qase(
    //     18,
    //     it('TC_REG_07 - Verifikasi pesan error validasi ketika format email yang dimasukkan salah pada form registrasi', function () {
    //         const {
    //             firstName,
    //             lastName,
    //             email,
    //             phone,
    //             password,
    //             confirmPassword,
    //         } = this.userData.userWithInvalidEmailFormat;

    //         RegisterPage.typeFirstName(firstName)
    //             .typeLastName(lastName)
    //             .typeEmail(email)
    //             .typePhone(phone)
    //             .typePassword(password)
    //             .typeConfirmPassword(confirmPassword)
    //             .clickRegisterButton()
    //             .assertInvalidEmailFormatErrorMessage();
    //     })
    // );

    // qase(
    //     19,
    //     it('TC_REG_08 -Verifikasi pesan error validasi ketika format nomor HP yang dimasukkan salah (misalnya, mengandung huruf atau panjang tidak sesuai', function () {
    //         const {
    //             firstName,
    //             lastName,
    //             email,
    //             phone,
    //             password,
    //             confirmPassword,
    //         } = this.userData.userWithInvalidPhoneNumber;

    //         RegisterPage.typeFirstName(firstName)
    //             .typeLastName(lastName)
    //             .typeEmail(email)
    //             .typePhone(phone)
    //             .typePassword(password)
    //             .typeConfirmPassword(confirmPassword)
    //             .clickRegisterButton()
    //             .assertPhoneErrorMessage();
    //     })
    // );

    // qase(
    //     20,
    //     it('TC_REG_09 - Verifikasi pesan error validasi ketika nilai pada field konfirmasi password tidak sama dengan nilai pada field password', function () {
    //         const {
    //             firstName,
    //             lastName,
    //             email,
    //             phone,
    //             password,
    //             confirmPassword,
    //         } = this.userData.userWithMismatchedPasswords;

    //         RegisterPage.typeFirstName(firstName)
    //             .typeLastName(lastName)
    //             .typeEmail(email)
    //             .typePhone(phone)
    //             .typePassword(password)
    //             .typeConfirmPassword(confirmPassword)
    //             .clickRegisterButton()
    //             .assertRequiredPasswordMismatchMessage();
    //     })
    // );

    // qase(
    //     21,
    //     it('TC_REG_10 - Verifikasi pesan error validasi ketika mencoba registrasi dengan semua field input dibiarkan kosong', () => {
    //         RegisterPage.clickRegisterButton();
    //         RegisterPage.assertRequiredFieldErrorMessage();
    //     })
    // );

    afterEach(() => {
        cy.clearCookies();
    });
});
