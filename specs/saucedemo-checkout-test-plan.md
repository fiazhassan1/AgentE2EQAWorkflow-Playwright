# SauceDemo Checkout Test Plan

## Objective
Validate the end-to-end checkout workflow for SauceDemo based on SCRUM-101 acceptance criteria.

## Application Under Test
- URL: https://www.saucedemo.com
- Username: standard_user
- Password: secret_sauce

## Scope
- Cart review and checkout entry
- Checkout information validation
- Order review and completion
- Navigation and cancellation behavior

## Test Scenarios

### TC01 - Cart review and checkout initiation
**Purpose:** Verify that a logged-in user can review the cart and start checkout.

**Steps:**
1. Open the SauceDemo login page.
2. Sign in with the provided credentials.
3. Add one product to the cart.
4. Open the cart.
5. Confirm item details and total price are visible.
6. Click Checkout.

**Expected Results:**
- The selected product is shown in the cart.
- Name, description, price, and quantity are visible.
- The total price is shown.
- The Checkout button navigates to the information form.

### TC02 - Checkout information validation
**Purpose:** Ensure required checkout fields are enforced.

**Steps:**
1. Sign in and add an item to the cart.
2. Open the cart and begin checkout.
3. Leave all checkout fields empty.
4. Click Continue.

**Expected Results:**
- An error message is displayed.
- The user remains on the checkout information page.
- The required field message is explicit.

### TC03 - Complete checkout happy path
**Purpose:** Confirm a valid order can be completed successfully.

**Steps:**
1. Sign in and add an item to the cart.
2. Open the cart and start checkout.
3. Enter First Name, Last Name, and Zip/Postal Code.
4. Continue to the overview page.
5. Review the order summary.
6. Click Finish.

**Expected Results:**
- The overview page shows item summary, payment information, shipping information, and totals.
- The confirmation page is displayed after Finish.
- A success message and Back Home button are visible.

### TC04 - Checkout cancellation flow
**Purpose:** Verify users can cancel checkout at an intermediate step.

**Steps:**
1. Sign in and add an item to the cart.
2. Open the cart and start checkout.
3. Enter personal details.
4. Continue to the overview page.
5. Click Cancel.

**Expected Results:**
- The user is returned to the cart page.
- The cart contents remain intact.

## Test Data
- Valid first name: Jane
- Valid last name: Doe
- Valid postal code: 12345
