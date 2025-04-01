const configuration = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-enum': [
      2,
      'always',
      [
        'api',
        'components',
        'config',
        'constants',
        'controllers',
        'dependencies',
        'documentation',
        'extensions',
        'lifecycles',
        'middlewares',
        'plugins',
        'readme',
        'routes',
        'schemas',
        'services',
        'styles',
        'testing',
        'types',
        'utils',
      ],
    ],
    'subject-case': [2, 'always', ['lower-case']],
  },
};

export default configuration;
