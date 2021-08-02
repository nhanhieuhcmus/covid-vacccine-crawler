const puppeteer = require("puppeteer");
const express = require("express");
const app = express();
let port = process.env.PORT || 3000;

const db = {};

app.get("/", (req, res) => {
    res.send(
        "Hello there! This API crawled from https://tiemchungcovid19.gov.vn/portal"
    );
});

app.get("/all", (req, res) => {
    const puppeteerRuner = async () => {
        const browser = await puppeteer.launch({
            // headless: false,
            args: ["--no-sandbox", "--disabled-setupid-sandbox"],
        });
        const page = await browser.newPage();
        // Configure the navigation timeout
        //   await page.setDefaultNavigationTimeout(0);
        await page.goto("https://tiemchungcovid19.gov.vn", {
            waitUntil: "load",
            timeout: 0, // remove the timeout
        });

        const data = await page.evaluate(() => {
            // const info = document.querySelectorAll('.icon-box-home span');
            // const info1 = info[0].innerText.replaceAll(',','').slice(0,-7);
            // const info2 = info[1].innerText.replaceAll(',','').slice(0,-6);
            // const info3 = info[2].innerText.replaceAll(',','').slice(0,-6);
            // return {
            //     "register": parseInt(info1),
            //     "lastDay": parseInt(info2),
            //     "allDone": parseInt(info3)
            // }

            const table = document.querySelectorAll("table ")[0];
            const tableHead = Array.from(table.querySelectorAll("th")).map(
                (th) => th.innerText
            );
            const tableBody = Array.from(
                table.querySelectorAll("tbody tr")
            ).map((tr) => {
                const rows = Array.from(tr.querySelectorAll("td")).map(
                    (td) => td.innerText
                );
                return {
                    id: rows[0],
                    province: rows[1],
                    expected: rows[2],
                    real: rows[3],
                    population18: rows[4],
                    injection: rows[5],
                    expectedRate: rows[6],
                    injectionRate: rows[7],
                    injection1Rate: rows[8],
                };
            });
            const viewMoreButton = document.querySelectorAll("button")[30];
            console.log("viewMoreButton: ", viewMoreButton);
            // viewMoreButton.click();
            return tableBody;
            // console.log(tableBody);
        });
        console.log(data);

        // res.json(data);
        Object.assign(db, data);
        res.json(db);

        await browser.close();
    };
    if (Object.keys(db).length > 0 && db.constructor === Object) res.json(db);
    else {
        puppeteerRuner();
    };
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
