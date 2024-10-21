import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200/");
   await page.getByText("Forms").click();
   await page.getByText("Form Layouts").click();

// test.beforeEach(async ({page}) => {
//     await page.goto('http://localhost:4200/');

//     await page.getByText('Forms').click();
//     await page.getByText('Form Layouts').click();
// });

// test('Locator syntax rules', async ({page}) => {
//     // by Tag name
//     await page.locator('input').first().click();

//     // by ID
//     page.locator('#inputEmail1');

//     // by Class value
//     page.locator('.shape-rectangle');

//     // by Attribute
//     page.locator('[placeholder="Email"]');

//     // by Class value (full)
//     page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]');

//     // Combine different selectors
//     page.locator('input[placeholder="Email"][nbinput]');

//     // By XPath (not recommended)
//     page.locator('//*[@id="inputEmail1"]');

//     // By partial text match
//     page.locator(':text("Using")');

//     // By exact text math
//     page.locator(':text-is("Using the Grid")')
// })

// test('User facing locators', async({page}) => {
//     await page.getByRole('textbox', {name: "Email"}).first().click(); // By Role
//     await page.getByRole('button', {name: "Sign in"}).first().click();

//     await page.getByLabel('Email').first().click(); // By Label

//     await page.getByPlaceholder('Jane Doe').click(); //By Placeholder

//     await page.getByText('Using the Grid').click(); //By Text

//     await page.getByTestId('SignIn').click(); // By data test id

//     await page.getByTitle('IoT Dashboard').click(); // By Title

// })

});

test("Locator syntax rules", async ({ page }) => {
  // by Tag name
  await page.locator("input").first().click();

  // by ID
  page.locator("#inputEmail1");

  // by Class value
  page.locator(".shape-rectangle");

  // by Attribute
  page.locator('[placeholder="Email"]');

  // by Class value (full)
  page.locator(
    '[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]'
  );

  // Combine different selectors
  page.locator('input[placeholder="Email"][nbinput]');

  // By XPath (not recommended)
  page.locator('//*[@id="inputEmail1"]');

  // By partial text match
  page.locator(':text("Using")');

  // By exact text math
  page.locator(':text-is("Using the Grid")');
});

test("User facing locators", async ({ page }) => {
  await page.getByRole("textbox", { name: "Email" }).first().click(); // By Role
  await page.getByRole("button", { name: "Sign in" }).first().click();

  await page.getByLabel("Email").first().click(); // By Label

  await page.getByPlaceholder("Jane Doe").click(); //By Placeholder

  await page.getByText("Using the Grid").click(); //By Text

  await page.getByTestId("SignIn").click(); // By data test id

  await page.getByTitle("IoT Dashboard").click(); // By Title
});

test.describe("Chart tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.getByText("Charts").first().click();
    await page.getByText("Echarts").click();
  });

  test("the Pie test", async ({ page }) => {
    await page.getByText("Pie").isVisible();
  });
});

test.describe("Form tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.getByText("Forms").click();
  });

  test("the first test1", async ({ page }) => {
    await page.getByText("Form Layouts").click();
  });

  test("navigate to datepicker page1", async ({ page }) => {
    await page.getByText("Datepicker").click();
  });
});

test('Locating child elements', async ({page}) => {
    await page.locator('nb-card nb-radio :text-is("Option 1")').click();// same as next line locators
    await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click();//chaining

    await page.locator('nb-card').getByRole('button', {name: "Sign in"}).first().click()

    await page.locator('nb-card').nth(3).getByRole('button').click();// try to avoid to select by index
})

test('locating parent elements', async({page}) => {
    await page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox', {name: "Email"}).click();
    await page.locator('nb-card', {has: page.locator('#inputEmail1')}).getByRole('textbox', { name: "Email" }).click();

    await page.locator('nb-card').filter({hasText: "Basic form"}).getByRole('textbox', {name: "Email"}).click();
    await page.locator('nb-card').filter({has: page.locator('.status-danger')}).getByRole('textbox', {name: "Password"}).click();

    await page.locator('nb-card').filter({has: page.locator('nb-checkbox')}).filter({hasText: "Sign in"})
        .getByRole('textbox', { name: "Email" }).click();

    await page.locator (':text-is("Using the Grid")').locator('..').getByRole('textbox', { name: "Email" }).click();
})

test('Reusing the locators', async ({page}) => {
    const basicForm = page.locator('nb-card').filter({hasText: "Basic form"});
    const emailField = basicForm.getByRole('textbox', {name: "Email"})

    await emailField.fill('test@test.com');
    await basicForm.getByRole('textbox', {name: "Password"}).fill('Welcome123');
    await basicForm.locator('nb-checkbox').click();
    await basicForm.getByRole('button').click();

    await expect(emailField).toHaveValue('test@test.com');
})

