import { useState } from 'react';
import './navbar.scss';
import { ArrowDropDown, LaptopWindows, Notifications, Search } from '@material-ui/icons';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    //console.log(window.scrollY);


    // Fires when the user repositions the scroll box in the scroll bar on the object.
    // well as it says... on scrolled
    window.onscroll = () => {
        setIsScrolled(window.scrollY === 0 ? false : true);
        return () => window.onscroll = null;
    }

  return (
    <div className={isScrolled ? 'navbar scrolled' : 'navbar'}>
        <div className="container">
            <div className="left">
                <img 
                    src="https://images.ctfassets.net/y2ske730sjqp/821Wg4N9hJD8vs5FBcCGg/9eaf66123397cc61be14e40174123c40/Vector__3_.svg?w=460" 
                    alt="" 
                />
                <span>Home</span>
                <span>Series</span>
                <span>Movies</span>
                <span>New and Popular</span>
                <span>My List</span>
            </div>
            <div className="right">
                <Search className='icon'/>
                <span>KIDS</span>
                <span>DVD</span>
                <Notifications className='icon'/>
                <img 
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpFN1Tvo80rYwu-eXsDNNzsuPITOdtyRPlYIsIqKaIbw&s" 
                    alt=""
                />
                <div className="profile">
                    <ArrowDropDown className='icon'/>
                    <div className="options">
                        <span>Settings</span>
                        <span>Logout</span>
                    </div>
                </div>
            </div>

        </div>
    </div>
  )
}

export default Navbar