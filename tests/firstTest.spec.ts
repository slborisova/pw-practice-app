import {test} from '@playwright/test';


test.beforeEach(async ({page}) => {
    await page.goto('http://localhost:4200/');
    await page.getByText('Forms').click();
    await page.getByText('Form Layouts').click();
});

test('Locator syntax rules', async ({page}) => {
    // by Tag name
    await page.locator('input').first().click();

    // by ID
    page.locator('#inputEmail1');

    // by Class value
    page.locator('.shape-rectangle');

    // by Attribute
    page.locator('[placeholder="Email"]');

    // by Class value (full)
    page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]');

    // Combine different selectors
    page.locator('input[placeholder="Email"][nbinput]');

    // By XPath (not recommended)
    page.locator('//*[@id="inputEmail1"]');

    // By partial text match
    page.locator(':text("Using")');

    // By exact text math
    page.locator(':text-is("Using the Grid")')
})

test.only('User facing locators', async({page}) => {
    await page.getByRole('textbox', {name: "Email"}).first().click(); // By Role
    await page.getByRole('button', {name: "Sign in"}).first().click();

    await page.getByLabel('Email').first().click(); // By Label

    await page.getByPlaceholder('Jane Doe').click(); //By Placeholder

    await page.getByText('Using the Grid').click(); //By Text

    await page.getByTestId('SignIn').click(); // By data test id

    await page.getByTitle('IoT Dashboard').click(); // By Title

})