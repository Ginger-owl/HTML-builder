const fs = require('fs')
const path = require('path');
const process = require('process');
const {stdin, stdout} = process

const output = fs.createWriteStream(path.resolve(__dirname, 'note.txt'), 'utf-8');

const greeting = "Hello!\nInput your note below (it will be saved to note.txt),\npress \`ctrl+C\` or input \`exit()\` to stop programm executing\n\n";
const farewellHandler = () => {
  stdout.write("You thoughts are saved! You can check it in a note.txt");
  process.exit()
}

stdout.write(greeting);

stdin.on('data', data => {
  const msg = data.toString().trim();
  if (msg == 'exit') {
    farewellHandler();
  }
  output.write(msg);
  output.write('\n');
});

process.on('SIGINT', farewellHandler);