/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/

import inquirer from 'inquirer';
import qr from 'qr-image';
import fs, { writeFile } from "fs";

inquirer
  .prompt([
    {
        message: "Enter your URL: ",
        name: "URL"
    }
  ])
  .then((answers) => {
    // console.log(answers);     ---To check whether it works
    const url = answers.URL;
    var qr_svg = qr.image(url);
    qr_svg.pipe(fs.createWriteStream('url_qr_img.png'));

    fs.writeFile("URLA.txt", url, (err) => {
        if (err) throw err;
        console.log("The file has beeen saved.");
    })
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });
