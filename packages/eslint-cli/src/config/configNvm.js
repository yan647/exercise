import ora from 'ora';
import fs from 'fs';

async function writeFile({ filename, content }) {
  const spinner = ora(`开始写入配置文件 ${filename}`).start();
  try {
    await fs.writeFileSync(filename, content);
    spinner.succeed();
  } catch (e) {
    spinner.fail();
    throw new Error(`${filename} 写入配置文件失败: \n${e}`);
  }
}

export default async function configNvm(options, nodeVersionAnswer) {
  const spinner = ora('配置nvm文件').start();
  await writeFile({ name: '.nvmrc', content: `v${nodeVersionAnswer}` });
  spinner.succeed();
}
