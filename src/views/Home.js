import React from 'react';
import { ProfilePic } from '../components';
import config from '../config';
const { about } = config;

export const Home = () => (
  <section className="hero is-medium is-primary is-bold">
    <div className="hero-container">
      <div className="hero-content">
        <h1 className="title is-1">{about.title}</h1>
        <h4 className="title is-4 is-centered" style={{ width: '60%', margin: '0 20%' }}>
          {about.content}
        </h4>
        <ProfilePic className="m-t-15" src={require('../img/me.jpg')} />
      </div>
    </div>
  </section>
);
