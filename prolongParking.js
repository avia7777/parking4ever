const puppeteer = require('puppeteer');

const CELLO_URL = 'https://cellopark.co.il/login/';

const startBrowser = async() => {
    let browser;
    try {
        console.log("Opening the browser......");
        // browser = await puppeteer.launch({headless: false});
        browser = await puppeteer.launch();
    } catch (err) {
        console.log("Could not create a browser instance => : ", err);
    }
    return browser;
}

const goToActiveParkingPage = async(browser) => {
    if (!browser) { return; }

    try {
        const page =  await browser.newPage();
        console.log(`Navigating to ${CELLO_URL}...`);
        await page.goto(CELLO_URL, { waitUntil: 'networkidle0' }); // wait until page load

        await page.waitForSelector('#username');
        await page.type('#username', '0507880485');
        console.log('Username was typed...');

        await page.waitForSelector('#password');
        await page.type('#password', 'hTVZYe8oF4');
        console.log('Password was typed...');

        await page.waitForSelector('[type=submit]');
        await page.click('[type=submit]');

        await page.waitForSelector('#liveParkingBtn');
        await page.click('#liveParkingBtn');
        return page;
    } catch (err) {
        console.log("Could not get to 'activeParking' page => : ", err);
        await browser.close();
        // await sendSMS(`Could not get to 'activeParking' page`);
        return;
    }
}

const clickProlongParking = async(page) => {
    console.log("Inside click last");
    if (!page) { return; }

    let prolongationStatus;
    try {
        // Repalce this line with page.waitForNavigate
        await page.waitForTimeout(5000);
        await page.waitForSelector('#ProlongationBtn');
        await page.click('#ProlongationBtn');
        console.log('Prolonging the parking..');
        await page.waitForSelector('#bot1-Msg1');
        await page.click('#bot1-Msg1');
        prolongationStatus = true;
        
    } catch (err) {
        console.log("There isn't active parking..");
        prolongationStatus = false;
    }
    if (prolongationStatus) {
        // sendSMS('The parking prolonged!');
    }
}

const prolongParking = async () => {
    const browser = await startBrowser();
    const page = await goToActiveParkingPage(browser);
    await clickProlongParking(page);

    if (browser) { await browser.close(); }
}

prolongParking();
