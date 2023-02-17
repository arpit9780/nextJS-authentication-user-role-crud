import { useRouter } from 'next/router';
import React, { Component, useEffect, useState } from 'react';
import { appRoutes } from '../../Constant';
import Header from './Header';

const Layout = ({ children }) => {
  
  return (
    <div className='layout'>
      <Header />
      {children}
    </div>
  )
}

export default Layout;