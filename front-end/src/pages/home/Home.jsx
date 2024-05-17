// import React from 'react'; //after react 17 it will import automatically so this can be removed.
import { useEffect, useState } from 'react';
import List from '../../components/List/List';
import Featured from '../../components/featured/Featured';
import Navbar from '../../components/navbar/Navbar';
import './home.scss';
import {makeRequest} from '../../axios';

const Home = ({type}) => {
  const [lists, setLists] = useState([]);
  const [genre, setGenre] = useState(null);

  useEffect(() => {
    // temp... only for testing until login is setup
    const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MjAwNDNkZGE0ZmE3MjJkYWI5NTc3YiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcxNTU4MTAwMCwiZXhwIjoxNzE2MDEzMDAwfQ.TeCfrxHO1sInG2M5BJxmpIZ-sejprim42_RO_8GteSM";
    
    const getRandomLists = async ()=> {
      try {
        // const res = await makeRequest.get(`lists${type ? "?type=" + type : ""}${genre ? "?&genre=" + genre : ""}`);
        // If we are using headers 
        const res = await makeRequest.get(`lists${type ? "?type=" + type : ""}${genre ? "?&genre=" + genre : ""}`, {
          headers: {
            accessToken: "Bearer " + accessToken,
            }
          }
        ); 
        //console.log(res);
        setLists(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getRandomLists();
  }, [genre, type]);

  return (
    <div className='home'>
        <Navbar/>
        <Featured type={type}/>
        {lists.map((list) => {
          return <List list={list} key={list._id}/>
        })
        }
        {/* <List list={{title: "test", content: [1,2,3,4,5,6,7,8]}}/> */}
        {/* <List/>
        <List/>
        <List/>
        <List/> */}
    </div>
  )
}

export default Home