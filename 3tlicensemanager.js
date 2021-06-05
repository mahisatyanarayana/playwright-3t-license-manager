const playwright = require('playwright');

(async () => {
  
    const browser = await playwright.chromium.launch({      headless: false  });
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://license.studio3t.com/');
    
    await page.click('"CONTINUE"');
    //await page.waitForTimeout(3000);
    await page.fill('input[name="email"]', "");
    await page.fill('input[name="password"]', "");
    await page.click('button');
    await page.waitForTimeout(3000);
    await page.click('"Manage Users"'); //pay attention at casing during DOM inspection
    await page.waitForTimeout(3000);
    //await page.selectOption('select', await page.$$('select option'));
    await page.selectOption('[aria-label="rows per page"]', '-1');
    //await page.waitForTimeout(3000);

    //const content = await page.textContent('#root > div > div > main > div.MuiContainer-root.jss5.MuiContainer-maxWidthXl > div.MuiPaper-root.jss39.MuiPaper-elevation1.MuiPaper-rounded > table > tbody > tr:nth-child(1) > td:nth-child(1)');
    //console.log(content);
//expect(content).toBe('msatya@appriver.com');
//await page.waitForTimeout(5000);
//await browser.close();
//return;
//const userCount = await page.$$eval('tbody .MuiTableRow-root', users => users.length);
//const userCount = await page.$$eval('tbody .MuiTableRow-root', users => users.);
//console.log(userCount);
    const allusers = await page.$$eval('tbody .MuiTableRow-root', (users) => {
        //console.log(users.length);
        return users.map(user => {
         
            const email = user.querySelector('td:nth-child(1)');
            const activated = user.querySelector('td:nth-child(4)');
            //const toText = (element) => element.innerText.trim();
            //console.log(user);


            
       
            return {
                email: email.textContent.trim(),
                activated: activated.textContent.trim(),
                //activated: activated
               
            };
        });
    });

    console.log(`${allusers.length} users found`);
    console.dir(allusers);


    await page.click('"Manage Users"')


    await page.waitForTimeout(3000);





    //await page.screenshot({ path: `3t.png` });
    await browser.close();
  
})();

