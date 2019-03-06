import readline from 'readline-promise';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: true,
});

export const answer = async (question) => {
  console.log(question);

  return rl.questionAsync('>> ');
};
