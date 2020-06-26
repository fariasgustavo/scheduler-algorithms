import React from "react";
import NumberInput from '../NumberInput';

const ProcessContext= () => {
    return(
        <div className="box-process">
            <NumberInput
                placeholder="Tempo na fila de aptos"
                max={80}
            />
        </div>  
    );
};

export default ProcessContext;