import React from 'react';
import '../../css/spinner.css'
//este componente es stateLess no necesita un estado y no necesita un ciclo de vida 
const Spinner = (props) => (
    <div className='center'>
     <div className="lds-dual-ring"></div>
    </div>
);

export default Spinner;
