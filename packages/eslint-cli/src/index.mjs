import {program} from 'commander';
import select from '@inquirer/select';

program.description('练习commander用的').version('0.0.1');
program.command('init').description('初始化eslint等配置').argument('<string>', 'test')
  .option('--verbose', '打印详细的安装信息')
  .action(async (str, options) => {
    console.log('参数：', str);
    console.log('options:', options);
    const frameworkAnswer = await select({
      message: '请选择框架',
      choices: [{
        name: 'Vue',
        value: 'Vue',
      }, {
        name: 'React',
        value: 'React',
      }, {
        name: 'node',
        value: 'node',
      }, {
        name: 'miniprogram',
        value: 'miniprogram',
      }],
    });
    console.log('你选择的框架是：', frameworkAnswer);
  });

program.parse();
