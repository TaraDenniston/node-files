const fs = require('fs');
const axios = require('axios');


// Step 1: Read file and print the contents
function cat(path) {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      console.log(err);
      process.exit(1);
    }
    console.log(data);
  });
}


// Step 2: Read URL and print the contents
async function webCat(url) {
  try {
    let response = await axios.get(url);
    console.log(response.data);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

let path = process.argv[2];

if (path.startsWith('http')) {
  webCat(path);
} else {
  cat(path);
}
