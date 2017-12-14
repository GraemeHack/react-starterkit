/* eslint-disable no-console */
import webpack from 'webpack';
import webpackConfig from '../webpack.config.prod';
import chalk from 'chalk';

process.env.NODE_ENV = 'production';

console.log(chalk.blue('Generation minified bundle for production'))

webpack(webpackConfig).run( (err, stats) => {
    if (err) {
        console.log(chalk.red(err));
        return 1;
    }

    const jsonStats = stats.toJson();

    if (jsonStats.hasErrors) {
        return jsonStats.erros.map(error => console.log(chalk.red(error)));
    }

    if(jsonStats.hasWarnings) {
        console.log(chalk.yellow('Webpack generated the following warnings'));
        jsonStats.hasWarnings.map(warning => console.log(chalk.yellow(warning)));
    }

    console.log(`Webpack stats: ${stats}`);

    console.log(chalk.green('The app has been build for production'))

    return 0;
})

