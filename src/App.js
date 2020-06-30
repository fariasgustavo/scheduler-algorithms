import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import ProcessSelection from "./components/ProcessSelection";
import NumberInput from './components/NumberInput';
import Button from './components/Button';

const App = (props) => {
  const dispatch = useDispatch();
  const [processQuantityField, setprocessQuantityField] = useState('');

  const submitProcessQuantity = () => {
    dispatch({
      type: 'ADD_PROCESS_QTY',
      payload: Number(processQuantityField) - 1,
    });
  }

  useEffect(() => {
  });

  return (
    <div className="App">
      <NumberInput
        name="precess-qty"
        placeholder="Quantidade de processos"
        max={10}
        value={processQuantityField}
        onInput={e => {
          setprocessQuantityField(e.target.value)
        }}
      />
      <Button
        label="Enter"
        type="primary"
        size="md"
        onClick={submitProcessQuantity}
      />
      <ProcessSelection/>
    </div>
  );
};

export default App;
