import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Header from "./layout/Header";

const Homepage = () => {

  const { auth } = useAuth();

  useEffect(() => {
    console.log(`USER: ${auth.user}`);
  }, [])

  return (
    <div>
      <Header />
      HOMEPAGE
    </div>
  );
};

export default Homepage;
