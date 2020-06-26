import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import NumberInput from './components/NumberInput';
import Button from './components/Button';
import SelectInput from './components/SelectInput';

const App = () => {
  const dispatch = useDispatch();
  const process = useSelector(state => state);

  useEffect(() => {
    console.log(process.scheduler);
  });

  return (
    <div className="App">
      <NumberInput
        placeholder="Quantidade de processos"
        max={10}
      />
      <Button
        label="Enter"
        type="primary"
        size="md"
      />
    </div>
  );
};

export default App;
