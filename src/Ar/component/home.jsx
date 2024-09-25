import Header from './header.jsx';
import Chair from './Chairs.jsx';
import Tables from './Tables.jsx';
import Sofa from './Sofa.jsx';
import Lamp from './Lamps.jsx';
import Kitchen from './Kitchen.jsx';
import { useState } from 'react';
import Elevator from './Elevator.jsx';
const Home = () => {
    const [chair, setchair] = useState(false);
    const [table, settable] = useState(false);
    const [lamp, setlamp] = useState(false);
    const [sofa, setsofa] = useState(false);
    const [kitchen, setkitchen] = useState(false);
    const [elevator, setElevator] = useState(false);
    const [All, setAll] = useState(true);

    const showAll = () => {
        setAll(true);
        setchair(false);
        settable(false);
        setsofa(false);
        setlamp(false);
        setkitchen(false);
    };

    const showchair = () => {
        setAll(false);
        setchair(true);
        settable(false);
        setsofa(false);
        setlamp(false);
        setkitchen(false);
        setElevator(false);


    };
    const showlamp = () => {
        setAll(false);
        setchair(false);
        settable(false);
        setsofa(false);
        setlamp(true);
        setkitchen(false);
        setElevator(false);


    };
    const showsofa = () => {
        setAll(false);
        setchair(false);
        settable(false);
        setsofa(true);
        setlamp(false);
        setkitchen(false);
        setElevator(false);


    };

    const showtable = () => {
        setAll(false);
        setchair(false);
        settable(true);
        setsofa(false);
        setlamp(false);
        setkitchen(false);
        setElevator(false);


    };
    const showkitchen = () => {
        setAll(false);
        setchair(false);
        settable(false);
        setsofa(false);
        setlamp(false);
        setkitchen(true);
        setElevator(false);


    };
    const showelevator = () => {
        setAll(false);
        setchair(false);
        settable(false);
        setsofa(false);
        setlamp(false);
        setkitchen(false);
        setElevator(true);


    };

    return (
        <>
            <Header />
            <div className='tags-container'>
                <div className='tags'>
                    <button onClick={showAll}>All</button>
                    <button onClick={showsofa}>Sofas</button>
                    <button onClick={showchair}>Chairs</button>
                    <button onClick={showtable}>Tables</button>
                    <button onClick={showlamp}>Lamps</button>
                    <button onClick={showkitchen}>Kitchens</button>
                    <button onClick={showelevator}>Elevators</button>
                </div>
            </div>

            <div className="Furniture">
                <div className="ornament-head">
                    <div>
                        <h1>{All ? 'All' : sofa ? 'Sofas' : table ? 'Tables' : lamp ? 'Lamps' : kitchen ? 
                        'Kitchens' : elevator?'Elevator': 'Chairs'}</h1>
                    </div>
                </div>
               <div className='allItem'>
               {All &&
                    <>
                        <Sofa />
                        <Chair />
                        <Tables />
                        <Lamp />
                        <Kitchen />
                        <Elevator />
                    </>}
                {chair && <Chair />}
                {table && <Tables />}
                {lamp && <Lamp />}
                {sofa && <Sofa />}
                {kitchen && <Kitchen />}
                {elevator && <Elevator />}
               </div>
            </div>
        </>
    );
};

export default Home;
