import express from 'express';
import morgan from 'morgan';
import compression from 'compression';
import forEach from 'lodash/forEach';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import routes from './src/routes';
import assets from './webpack-assets.json';

const app = express();
const PORT = 8080;

app.use(morgan('dev'));
app.use(compression());
app.use(express.static('build'));

app.get('*', (req, res) => {
  match({ routes, location: req.url }, (err, redirect, props) => {
    if (err) {
      res.status(500).send(err.message);
    } else if (redirect) {
      res.redirect(redirect.pathname + redirect.search);
    } else if (props) {
      const appHtml = renderToString(<RouterContext {...props} />);
      res.send(renderPage(appHtml)); // eslint-disable-line
    }
  });
});

function configAssets() {
  function injectJs() {
    let js = '';
    // iterate through scripts in correct order
    Object.keys(assets).reverse().forEach((key) => {
      if (assets[key].hasOwnProperty('js')) {
        js += `<script src="${assets[key].js}"></script>\n`;
      }
    });
    return js;
  }

  function injectCss() {
    let css = '';
    forEach(assets, (value) => {
      if (value.hasOwnProperty('css')) {
        css += `<link rel="stylesheet" src="${value.css}">\n`;
      }
    });
    return css;
  }

  return {
    injectJs,
    injectCss,
  };
}

function renderPage(appHtml) {
  return `
  <!DOCTYPE html public="storage">
  <!--[if lt IE 7 ]> <html lang="en" class="ie6" > <![endif]-->
  <!--[if IE 7 ]>    <html lang="en" class="ie7" > <![endif]-->
  <!--[if IE 8 ]>    <html lang="en" class="ie8" > <![endif]-->
  <!--[if IE 9 ]>    <html lang="en" class="ie9" > <![endif]-->
  <!--[if (gt IE 9)|!(IE)]><!--> <html lang="en" class="" > <!--<![endif]-->
  <head>
  <meta charset="utf-8">
  <title>Bryan Lackey</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.0.15/css/bulma.min.css">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">
  ${configAssets().injectCss()}
  </head>
  <body>
  <div id="app">${appHtml}</div>
  ${configAssets().injectJs()}
  </body>
  </html>
  `;
}

app.listen(PORT, () => console.log(`Server listening at localhost:${PORT}`)); // eslint-disable-line
