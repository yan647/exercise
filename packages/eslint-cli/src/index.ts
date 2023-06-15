const { program } = require('commander');

program.name('eslint-cli-eg').description('练习commander用的').version('0.0.1');
program.command('init').description('初始化eslint等配置').argument('<string>', 'test')
  .option('--verbose', '打印详细的安装信息')
  .action((str:string, options:{verbose?:boolean}) => {
    console.log('参数：', str);
    console.log('options:', options);
  });

program.parse();
