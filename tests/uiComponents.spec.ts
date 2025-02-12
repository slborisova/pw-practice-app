import { test, expect } from "@playwright/test";

test.beforeEach(async ({page}) => {
    await page.goto('http://localhost:4200/');
});

test.describe('Form Layouts page', () => {
    test.beforeEach( async ({page}) => {
        await page.getByText('Forms').click();
        await page.getByText('Form Layouts').click();
    });

    test('input fields', async({page}) => {
        const usingTheGridEmailInput = page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox', {name: "Email"});

        await usingTheGridEmailInput.fill('test@test.com');
        await usingTheGridEmailInput.clear();
        await usingTheGridEmailInput.pressSequentially('test2@test.com', {delay: 500});

        // generic assertion (grab the text from input field)
        const inputValue = await usingTheGridEmailInput.inputValue();
        expect (inputValue).toEqual('test2@test.com');

        // locator assertion 
        await expect(usingTheGridEmailInput).toHaveValue('test2@test.com');
    });

test('radio buttons', async({page}) => {
    const usingTheGridForm = page.locator('nb-card', {hasText: "Using the Grid"});

    // await usingTheGridForm.getByLabel('Option 1').check({force: true}); //1st option
    await usingTheGridForm.getByRole('radio', {name: 'Option 1'}).check({force: true}); //2nd option
    // General assertion (is the radio button selected ot not selected)(isChecked(), toBeTruthy())
    // to check the status(validation)
    const radioStatus = await usingTheGridForm.getByRole('radio', {name: 'Option 1'}).isChecked(); //check the status; return boolean - True or False
    expect(radioStatus).toBeTruthy();
        // Locator assertion(toBeChecked)(to check the status(validation)
    await expect(usingTheGridForm.getByRole('radio', {name: 'Option 1'})).toBeChecked();

    await usingTheGridForm.getByRole('radio', {name: 'Option 2'}).check({force: true});
    expect (await usingTheGridForm.getByRole('radio', {name: 'Option 1'}).isChecked()).toBeFalsy;// to validate that it is not checked any more
    expect (await usingTheGridForm.getByRole('radio', {name: 'Option 2'}).isChecked()).toBeTruthy;// to validate that it is checked
})

});
