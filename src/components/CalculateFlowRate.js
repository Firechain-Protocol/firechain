import React, { useState } from 'react';
import { Button, Form, FormGroup, FormControl } from 'react-bootstrap';
import { jsx, Box } from 'theme-ui';
import { ethers } from 'ethers';
// import '../pages/calculateFlowRate.css';

export const CalculateFlowRate = () => {
  const [amount, setAmount] = useState('');
  const [flowRate, setFlowRate] = useState('');

  function calculateFlowRate(amountInEther) {
    if (
      typeof Number(amountInEther) !== 'number'
      // eslint-disable-next-line no-restricted-globals
      || isNaN(Number(amountInEther)) === true
    ) {
      console.log(typeof Number(amountInEther));
      alert('You can only calculate a flowRate based on a number');
    } else if (typeof Number(amountInEther) === 'number') {
      const monthlyAmount = ethers.utils.parseEther(amountInEther.toString());
      const calculatedFlowRate = Math.floor(monthlyAmount / 3600 / 24 / 30);
      setFlowRate(calculatedFlowRate);
    }
  }

  const handleAmountChange = (e) => {
    // eslint-disable-next-line no-return-assign
    setAmount(() => ([e.target.name] = e.target.value));
  };

  return (
    <Box as="section"  className="bg-blue-100 ">
    <div className="mt-32 text-black mb-3" align="center" style={{ padding: '5px 7px 5px 7px', fontSize: '26px' }}>
      <h2>Calculate Your FlowRate</h2>
      <Form>
        <FormGroup className="mb-3 w-1/2">
          <FormControl
            name="recipient"
            value={amount}
            onChange={handleAmountChange}
            placeholder="Enter an amount in USD"
          />
        </FormGroup>
        {/* <Button onClick={() => deleteFlow(recipient)}> */}
        <Button
          variant="success"
          style={{ padding: '20px 15px 20px 15px', fontSize: '20px' }}
          onClick={() => {
            calculateFlowRate(amount);
          }}
          className="calculateButton bg-blue-900"
        >
          Click to Calculate Your FlowRate
        </Button>
      </Form>
      <div className="flowRate">
        <p>

          Your FlowRate is <b> {flowRate} </b>
        </p>
      </div>
    </div>
    </Box>
  );
};
