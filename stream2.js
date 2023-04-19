const { Transform } = require('stream');
const fs = require('fs');

class CapitalizeTransform extends Transform {
  constructor(options) {
    super(options);
    this.firstChunk = true;
  }

  _transform(chunk, encoding, callback) {
    
    const words = chunk.toString().split(' ');

    
    if (this.firstChunk) {
      this.firstChunk = false;
      if (words.length > 0) {
        words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
      }
    }

    
    const capitalizedWords = words.map(word => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    });

    
    this.push(capitalizedWords.join(' '));
    callback();
  }
}



const readStream = fs.createReadStream('read.txt');
const writeStream = fs.createWriteStream('write.txt');

const capitalizeTransform = new CapitalizeTransform();

readStream.pipe(capitalizeTransform).pipe(writeStream);
