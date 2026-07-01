# SCRUM-101 Exploratory Testing Findings

## Summary
Exploratory testing was executed against SauceDemo using a standard user account. The checkout flow behaved as expected for the core happy path and the required-field validation scenario.

## Observed UI Details
- Login page uses the `#user-name`, `#password`, and `#login-button` selectors.
- Inventory page exposes the backpack add-to-cart control through `[data-test="add-to-cart-sauce-labs-backpack"]`.
- Cart page uses `.shopping_cart_link` to access the cart.
- Checkout information page contains `firstName`, `lastName`, and `postalCode` form fields with `data-test` attributes.
- The empty form submission shows the message: `Error: First Name is required`.
- The overview page includes item total, tax, total, payment information, shipping information, and the Finish button.
- The completion page displays the success message and a Back Home button.

## Observations
- The checkout experience is straightforward and consistent across the tested steps.
- Validation errors are visible immediately and prevent progression until the required data is present.
- The confirmation screen clearly indicates that the order has been completed.

## Evidence
- Screenshots were not persisted in this environment, but the browser session confirmed the text and navigation states above.
