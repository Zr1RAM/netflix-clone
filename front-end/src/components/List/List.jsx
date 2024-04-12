import { ArrowBackIosOutlined, ArrowForwardIosOutlined } from '@material-ui/icons';
import './list.scss';
import ListItem from '../listItem/ListItem';
import { useRef, useState } from 'react';

const List = () => {
    const [isMoved, setIsMoved] = useState(false);
    const [slideNumber, setSlideNumber] = useState(0);
    
    const listItemContainerRef = useRef();

    const handleClick = (direction) => {
        setIsMoved(true);
        let translateText = ``;
        let distance = listItemContainerRef.current.getBoundingClientRect().x - 50;
        if(direction === 'left' && slideNumber > 0) {
            setSlideNumber(slideNumber - 1);
            translateText = `translateX(${230 + distance}px)`;
            listItemContainerRef.current.style.transform = translateText;
        }
        if(direction === 'right' && slideNumber < 5) { // this max number should scale automatically with screen somwhow
            setSlideNumber(slideNumber + 1);
            translateText = `translateX(${-230 + distance}px)`;
            listItemContainerRef.current.style.transform = translateText;
        }
        //console.log(translateText);
        
    }

  return (
    <div className='list'>
        <span className="listTitle">Continue to watch</span>
        <div className="wrapper">
            <ArrowBackIosOutlined 
            className='sliderArrow left' 
            onClick={()=>handleClick("left")}
            style={{display: !isMoved && 'none'}}
            />
            <div className="container" ref={listItemContainerRef}>
                <ListItem index={0}/>
                <ListItem index={1}/>
                <ListItem index={2}/>
                <ListItem index={3}/>
                <ListItem index={4}/>
                <ListItem index={5}/>
                <ListItem index={6}/>
                <ListItem index={7}/>
                <ListItem index={8}/>
                <ListItem index={9}/>
            </div>
            <ArrowForwardIosOutlined className='sliderArrow right' onClick={()=>handleClick("right")}/>
        </div>
    </div>
  )
}

export default List