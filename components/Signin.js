/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react';
import { Button } from 'react-bootstrap';
import { signIn } from '../utils/auth';

function Signin() {
  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '400px',
        margin: '0 auto',
      }}
    // eslint-disable-next-line react/jsx-no-comment-textnodes
    >
      {/* // eslint-disable-next-line jsx-a11y/alt-text, jsx-a11y/img-redundant-alt, jsx-a11y/img-redundant-alt, jsx-a11y/img-redundant-alt, jsx-a11y/img-redundant-alt */}
      <img
        src="https://user-images.githubusercontent.com/124536589/263869038-2c635df0-2691-41bc-ba5a-7366377004a1.png"
        alt="Your Image Alt Text"
        style={{
        }}
      />

      <h1>Hi there!</h1>
      <p>Click the button below to login!</p>
      <Button type="button" size="lg" className="copy-btn" onClick={signIn}>
        Sign In
      </Button>
    </div>
  );
}

export default Signin;
