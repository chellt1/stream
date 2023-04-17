const fs = require('fs');

const fileStream = fs.createReadStream('stream.txt', 'utf8');
let wordCount = 0;

fileStream.on('data', function(chunk) {
  wordCount += chunk.split(/\s+/).length; 
});

fileStream.on('end', function() {
  console.log(`Кількість слів у файлі: ${wordCount}`);
});
