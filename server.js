import express from 'express';
import morgan from 'morgan';
import compression from 'compression';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import routes from './src/routes';

const app = express();
const PORT = process.env.PORT || 8080;

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
  <link href="styles.css" rel="stylesheet">
  </head>
  <body>
  <div id="app">${appHtml}</div>
  <script src="manifest.js"></script>
  <script src="vendor.js"></script>
  <script src="src.js"></script>
  </body>
  </html>
  `;
}

app.listen(PORT, () => console.log(`Server listening at localhost:${PORT}`)); // eslint-disable-line
