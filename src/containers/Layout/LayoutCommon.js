import React from 'react';
import { Link } from 'react-router-dom'
import css from './LayoutCommon.scss';

const LayoutCommon = (props) => (
  <>
    <div>
      <Link to="/">Breaking</Link>
      {' '}
      |
      {' '}
      <Link to="/tech-news">Tech</Link>
      {' '}
      |
      {' '}
      <Link to="/profile">Profile</Link>
      {' '}
      |
      {' '}
      <Link to="/login">Login</Link>
    </div>
    <div className={css.mainWrapper}>{props.children}</div>
  </>
);

export default LayoutCommon;
