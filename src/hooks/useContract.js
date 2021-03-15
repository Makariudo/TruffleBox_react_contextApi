import { useState } from 'react';

//hook custom avec retrieve et get pour sortir les fonctions contrats du component fonction
const useContract = (instance, accounts, setValue) => {
    const [isValidated, setValidated] = useState(true)
   
    const retrieve = async () => {
      setValidated(false)
      const result = await instance.methods.get().call()
      setValue(result);
      setValidated(true); 
    }
   
    const store = async (value) => {
        setValidated(false)
        await instance.methods.set(parseInt(value)).send({ from: accounts[0] })
            .then(async (result) => {
                console.dir(result)
                retrieve()
        })
    }

    return { retrieve, store, isValidated }
}
export default useContract;
