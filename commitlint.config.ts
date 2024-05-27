export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'build', // 构建
        'ci', //ci
        'chore', // 改变构建流程或增加依赖库，工具等
        'docs', // 仅仅修改文档，比如README
        'feat', // 新增feature
        'fix', // 修复bug
        'perf', // 优化相关，比如提升性能、体验
        'refactor', // 代码重构，没有增加新功能或修复bug
        'revert', //回滚到上一个版本
        'style', // 仅仅修改了空格、缩进、等，不改变代码逻辑
        'test', // 测试用例，包括单元测试集成测试等
        'wip', // Work in process
      ],
    ],
  },
}
