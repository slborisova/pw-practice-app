import {test as base} from '@playwright/test';
import { PageManager } from '../pw-practice-app/page-objects/pageManager';

export type TestOptions = {
    globalsQaURL: string
    formLayoutsPage: string
    pageManager: PageManager
}

export const test = base.extend<TestOptions>({
    globalsQaURL: ['', {option:true}],

    formLayoutsPage: async({page}, use) => {
        await page.goto('/');
        await page.getByAltText('Form').click();
        await page.getByAltText('Form Layouts').click();
        await use('');
        console.log('Tear Down');
    },

    pageManager: async({page, formLayoutsPage}, use) => {
        const pm = new PageManager(page);
        await use(pm)
    }
})