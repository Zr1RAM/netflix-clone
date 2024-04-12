// import React from 'react'; //after react 17 it will import automatically so this can be removed.
import List from '../../components/List/List';
import Featured from '../../components/featured/Featured';
import Navbar from '../../components/navbar/Navbar';
import './home.scss';

const Home = () => {
  return (
    <div className='home'>
        <Navbar/>
        <Featured type={"movie"}/>
        <List/>
        <List/>
        <List/>
        <List/>
    </div>
  )
}

export default Home