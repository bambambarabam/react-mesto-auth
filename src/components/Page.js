import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';

function Page(props) {
  return (
    <>
    <Header headerUser={props.userData} loggedIn={props.loggedIn} signOut={props.signOut} />
    <Main {...props} />
    <Footer />
    </>
  )
}

export default Page;
