import { useEffect, useState } from 'react';
import withContext from "./context";
import useContract from './hooks/useContract'
import './App.css';

function App(props) {
  const { value: { connectWeb3, contract, accounts, storageValue } } = props
  
  const [value, setValue]  = useState(0)
  const [input, setInput] = useState(0)
  /* useContract */
  const { retrieve, store, isValidated } = useContract(contract, accounts, setValue)
  
  useEffect(() => {
    connectWeb3();
  }, [])

 useEffect(() => {
   if(contract){
     setValue(storageValue)
     setInput(storageValue)
   }
  }, [contract])
 

  const handleChange = e => setInput(e.target.value)
  const handleSubmit = e => {
    e.preventDefault()
    if (!input) { return }
    store(input)
  }
  return (
    <div className="App">
        <h1>Good to Go!</h1>
        <p>Your Truffle Box is installed and ready.</p>
        <h2>Smart Contract Example</h2>
        <p>
          {contract ? "Your contracts compiled and migrated successfully" : "Try to deploy your contract !" }
        </p>
        <p>
          Try changing the value stored on your smart contract : <input type="number" name="inputValue" value={input} onChange={handleChange}></input> <button type="button" onClick={handleSubmit} >Submit</button>
        </p>
        <div>The stored value is: {!isValidated ? "data is loading..." : value}</div>
      </div>
  );
}
export default withContext(App);
