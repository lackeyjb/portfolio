import express from 'express';
import morgan from 'morgan';
import compression from 'compression';
import ejs from 'ejs';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import routes from './src/routes';

const app = express();
const PORT = process.env.PORT || 8080;

app.use(morgan('dev'));
app.use(compression());
app.use(express.static('build'));

app.set('view engine', 'html');
app.engine('html', ejs.renderFile);
app.set('views', `${__dirname}/build`);

app.get('*', (req, res) => {
  match({ routes, location: req.url }, (err, redirect, props) => {
    if (err) {
      res.status(500).send(err.message);
    } else if (redirect) {
      res.redirect(redirect.pathname + redirect.search);
    } else if (props) {
      const appHtml = renderToString(<RouterContext {...props} />);
      res.render('index', { appHtml });
    }
  });
});

app.listen(PORT, () => console.log(`Server listening at localhost:${PORT}`)); // eslint-disable-line
