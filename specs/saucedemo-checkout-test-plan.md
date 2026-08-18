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
**Purpose:** Ensure required checkout fields are enforced, one at a time.

**Steps:**
1. Sign in and add an item to the cart.
2. Open the cart and begin checkout.
3. Leave First Name empty (Last Name and Postal Code filled) and click Continue.
4. Leave Last Name empty (First Name and Postal Code filled) and click Continue.
5. Leave Postal Code empty (First Name and Last Name filled) and click Continue.

**Expected Results:**
- Each case shows its own explicit required-field error message ("First Name is required", "Last Name is required", "Postal Code is required").
- The user remains on the checkout information page in every case.

### TC02b - Checkout information accepts special characters
**Purpose:** Document that SauceDemo does not enforce a format on the checkout fields (no client-side pattern/regex validation), only presence.

**Steps:**
1. Sign in and add an item to the cart.
2. Open the cart and begin checkout.
3. Enter values containing spaces, hyphens, apostrophes, digits, and symbols in First Name, Last Name, and Postal Code.
4. Click Continue.

**Expected Results:**
- No validation error is shown.
- The user advances to the checkout overview page.

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
**Purpose:** Verify users can cancel checkout at each intermediate step.

**Steps (from checkout information):**
1. Sign in and add an item to the cart.
2. Open the cart and start checkout.
3. Click Cancel on the checkout information page.

**Steps (from checkout overview):**
1. Sign in and add an item to the cart.
2. Open the cart and start checkout.
3. Enter personal details and continue to the overview page.
4. Click Cancel on the overview page.

**Expected Results:**
- Cancelling from checkout information returns the user to the cart page.
- Cancelling from checkout overview returns the user to the products
  (inventory) page, not the cart page — confirmed against the live app.
- In both cases the cart badge count is unchanged (the item is not removed).

### TC05 - Cart clears after order completion
**Purpose:** Verify the cart is emptied once an order is finished (Business Rule 4).

**Steps:**
1. Sign in and add an item to the cart.
2. Complete the checkout flow through Finish.
3. Observe the confirmation page.
4. Click Back Home.

**Expected Results:**
- No cart badge is shown on the confirmation page.
- After returning to the products page, no cart badge is shown (cart is empty).

## Test Data
- Valid first name: Jane
- Valid last name: Doe
- Valid postal code: 12345

## Supplementary Scenarios (beyond SCRUM-101 scope)

These extend coverage into login and multi-item cart handling, which the checkout
flow depends on but which SCRUM-101's acceptance criteria don't explicitly cover.
Automated in `tests/saucedemo-checkout/login.spec.ts` and `cart.spec.ts`.

### TC06 - Login negative paths
- Invalid username/password combination is rejected with an explicit error.
- `locked_out_user` is rejected with a locked-out error.
- Empty username / empty password are each rejected with a field-specific error.
- Logging out returns the user to the login page, and directly navigating to a
  protected page afterward (e.g. `/inventory.html`) is blocked with an error
  rather than silently succeeding.

### TC07 - Multi-item cart
- Adding a second product increments the cart badge; removing one decrements it.
- Cart page lists all added items; checkout overview shows correct item total,
  tax, and total for multiple products.
- Removing an item from the cart page updates the item list, badge, and totals.
