import {program} from 'commander';
import select from '@inquirer/select';
import confirm from '@inquirer/confirm';

program.description('练习commander和inquirer用的').version('0.0.1');
program.command('init')
  .description('初始化eslint等配置')
  .option('--verbose', '打印详细的安装信息')
  .action(async (options) => {
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
    if(options.verbose) {
      console.log('你选择的框架是：', frameworkAnswer);
    }

    const languageAnswer = await select({
      message: '请选择开发语言',
      choices: [{
        name: 'typescript',
        value: 'typescript',
      }, {
        name: 'javascript',
        value: 'javascript',
      }],
    });
    if(options.verbose) {
      console.log('你选择的开发语言是：', languageAnswer);
    }


    const needStylelint=await confirm({
      message:'是否需要 scss stylelint? (默认为 Y)'
    })
    if(options.verbose) {
      console.log(`你选择${needStylelint ? '' : '不'}需要 scss stylelint`);
    }



  });

program.parse();
