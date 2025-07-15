# 🚀 Cypress + Qase.io Integration

Automated end-to-end testing project using **Cypress** integrated with **Qase.io TestOps** for test management, reporting, and tracking.

---

## 📂 Project Structure

```
.
├── cypress/
│   ├── e2e/
│   ├── fixtures/
│   └── support/
├── .env
├── .gitignore
├── cypress.config.js
├── package.json
├── yarn.lock
```

---

## ⚙️ Environment Setup

### 📌 Prerequisite

Pastikan sudah menginstal `yarn` secara global (hanya perlu sekali di komputer Anda):

```bash
npm install -g yarn
```

### 🔑 1. Clone the repository

```bash
git clone https://github.com/Albarokah9/Cypress_qase.io.git
cd Cypress_qase.io
```

### 📦 2. Install dependencies

```bash
yarn install
```

> Ini otomatis menginstal semua dependency dari `package.json`:
>
> * cypress
> * cypress-qase-reporter
> * cypress-multi-reporters
> * dotenv
> * cross-env

### 🔐 3. Create .env

Buat file `.env` di root project:

```ini
QASE_TESTOPS_API_TOKEN=your_api_token
QASE_TESTOPS_PROJECT=CTEST
```

> Ganti `your_api_token` dengan API token dari Qase, dan `CTEST` dengan Project Code Qase kamu.

Pastikan `.env` diabaikan Git:

```
node_modules/
.env/
logs/
```

---

## 🚀 Usage

### ▶️ Run tests locally (open Cypress UI)

```bash
yarn cypress:open
```

### 🚀 Run tests & push results to Qase.io

```bash
yarn test:qase
```

---

## 🔗 Configuration (cypress.config.js)

Sudah dikonfigurasi dengan:

* Multi reporter (`spec` + `cypress-qase-reporter`)
* Membaca token & project code dari `.env`
* Upload attachment & mark run complete di Qase

```javascript
require('dotenv').config();
const { defineConfig } = require('cypress');

module.exports = defineConfig({
    reporter: 'cypress-multi-reporters',
    reporterOptions: {
        // Aktifkan reporter "spec" (output ke terminal) & Qase
        reporterEnabled: 'spec, cypress-qase-reporter',

        // Opsi untuk cypress-qase-reporter
        cypressQaseReporterReporterOptions: {
            debug: true,
            logging: true,

            // ⚠️ Untuk testops mode, letakkan token di testops.api.token
            testops: {
                api: {
                    token: process.env.QASE_TESTOPS_API_TOKEN,
                },
                project: process.env.QASE_TESTOPS_PROJECT,
                uploadAttachments: true,
                run: {
                    complete: true,
                },
            },
        },
    },

    e2e: {
        setupNodeEvents(on, config) {
            // Hook plugin & metadata Qase untuk TestOps
            require('cypress-qase-reporter/plugin')(on, config);
            require('cypress-qase-reporter/metadata')(on);
        },
        baseUrl: 'https://soapleasure.com/',
        specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
        watchForFileChanges: false,
    },
});

```

---

## 🔥 Available scripts

| Script                    | Description                      |
| ------------------------- | -------------------------------- |
| `yarn cypress:open`       | Run Cypress GUI interactive      |
| `yarn cypress:run`        | Run all tests headlessly         |
| `yarn test:qase`          | Run tests & push results to Qase |
| `yarn test:open:chrome`   | Run in Chrome GUI                |
| `yarn test:open:firefox`  | Run in Firefox GUI               |
| `yarn test:open:edge`     | Run in Edge GUI                  |
| `yarn test:open:electron` | Run in Electron GUI              |

---

## ✍️ Writing Tests with Qase Integration

### ✅ Sederhana

```javascript
it('TC_REG_01 - Should register successfully', { qaseId: 1 }, () => {
    cy.visit('/register');
    // your steps here
});
```

### ✅ Menggunakan helper `qase()`

```javascript
/// <reference types="cypress" />
import { qase } from 'cypress-qase-reporter/mocha';
import RegisterPage from '../../support/pages/registerPage';

describe('Register Test Suite', () => {
    beforeEach(function () {
        cy.fixture('registerData.json').as('userData');
        RegisterPage.visitRegisterPage();
    });

    qase(12, it('TC_REG_01 - Berhasil membuat akun baru', function () {
        const { firstName, lastName, email, phone, password, confirmPassword } = this.userData.validUser;

        RegisterPage.typeFirstName(firstName)
            .typeLastName(lastName)
            .typeEmail(email)
            .typePhone(phone)
            .typePassword(password)
            .typeConfirmPassword(confirmPassword)
            .clickRegisterButton()
            .assertRegistrationSuccessMessage(email);
    }));
});
```

---

🚀 Happy Testing! 🎉
