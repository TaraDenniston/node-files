const fs = require('fs');
const axios = require('axios');


function handleOutput(data, file) {
  if (file) {
    fs.writeFile(file, data, 'utf8', error => {
      if (error) {
        console.log(err);
        process.exit(1);
      }
    });
  } else {
    console.log(data);
  }
}


// Step 1: Read file and print the contents
function cat(path, file) {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      console.log(err);
      process.exit(1);
    }
    handleOutput(data, file);
  });
}


// Step 2: Read URL and print the contents
async function webCat(url, file) {
  try {
    let response = await axios.get(url);
    handleOutput(response.data, file);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}


// Step 3: Add ability for optional arument to write to a file
let arg = process.argv[2];
let file;
let path;


if (arg === '--out') {
  file = process.argv[3];
  path = process.argv[4];
} else {
  path = process.argv[2];
}
    
if (path.startsWith('http')) {
  webCat(path, file);
} else {
  cat(path, file);
}
  
