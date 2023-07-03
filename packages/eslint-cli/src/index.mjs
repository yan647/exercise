import {program} from 'commander';
import select from '@inquirer/select';
import confirm from '@inquirer/confirm';
import input from '@inquirer/input';
import configNvm from 'packages/eslint-cli/src/config/configNvm.js';

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

    const packageManagerAnswer = await select({
      message: '请选择正在使用的包管理工具',
      choices: [{name: 'yarn', value: 'yarn',}, {name: 'npm', value: 'npm'}]
    })

    const nodeVersionAnswer = await input({ message: '请输入node版本（格式：14.17.0）' });

    const needStylelint = await confirm({
      message: '是否需要 scss stylelint? (默认为 Y)'
    })


    if (options.verbose) {
      console.log('你选择的框架是：', frameworkAnswer);
      console.log('你选择的开发语言是：', languageAnswer);
      console.log('你选择的包管理工具：',packageManagerAnswer);
      console.log('你输入的node版本：',nodeVersionAnswer);
      console.log(`你选择${needStylelint ? '' : '不'}需要 scss stylelint`);
    }

    console.log('开始配置');

    await configNvm(options,nodeVersionAnswer);
    // await configEslint(options,answers);
    // await configStylelint(options,answers);
    // await configPrettier(options,answers);
    // await configVscode(options,answers);
    // await configGit(options,answers);
    console.log('结束配置');
  });

program.parse();
