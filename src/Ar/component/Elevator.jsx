import { Elevators } from '../data'
import {Link} from 'react-router-dom'

import { TbAugmentedReality } from "react-icons/tb";

const Elevator = () => {


    return (
        
        
        <>
            {
                Elevators.map((furniture) => {
                    return (
                        
                        <div key={furniture.id} className='furniture-info'>
                            <div className="furniture-logo">
                                <img src={furniture.image} alt='furniture' />
                            </div>
                            <div className='basic-desc'>
                                <h2 className='furniture-name'>
                                    {furniture.name}
                                </h2>
                                <div className='price-desc'>
                                <p className='furniture-desc'>
                                    {furniture.desc}
                                </p>
                                <p className='furniture-price'>
                                    {furniture.price}
                                </p>
                                </div>
                            </div>
                            <div className="ar-3d">
                                
                                <Link to={furniture.link3D} ><TbAugmentedReality size={'50px'} color='black' /></Link>
                            </div>

                        </div>
                        
                    )
                })
            }
        </>
        
    )
}
export default Elevator;