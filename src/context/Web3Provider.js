import React, { useMemo, useState } from "react";
import SimpleStorageContract from "../contracts/SimpleStorage.json";
import getWeb3 from "../utils/getWeb3";
import { Web3Context } from '.'

//recup le provider du web3Context = createcontext()
const { Provider } = Web3Context;

//mise en place du state globale
const Web3Provider = ({ children }) => {
    const [state, setState] = useState({
        web3: null,
        accounts: null,
        contract: null,
        storageValue: 0,
    })
   

    //connexion au web3 with metamask
    const connectWeb3 = new Promise(async (resolve) => {
        const web3 = await getWeb3();
        resolve(web3)
    });

    //creation de l'instance du contrat et recup des accounts metamaask
    const connectBlockchain = (web3) =>
        new Promise(async (resolve) => {
            const accounts = await web3.eth.getAccounts();
            const networkId = await web3.eth.net.getId();
            console.log('networkid:', networkId);
            const deployedNetwork = SimpleStorageContract.networks[networkId];
            const instance = new web3.eth.Contract(
              SimpleStorageContract.abi,
              deployedNetwork && deployedNetwork.address,
            );
            console.log('connected to blockchain');
            
            //getValue
            const value = await instance.methods.get().call()
            console.log("storageValue est de ", value)

            resolve({ web3, instance, accounts, value })
        })
    


    //enchainement des promesses connexionWeb3, recup accounts, connexion blockchain, instancie le contract et init le state globale
    const connect = () => {
        connectWeb3
            .then(connectBlockchain, console.error)
            .then(({ web3, instance, accounts, value }) => {
                setState({ web3, accounts, contract: instance, storageValue: value })
            })
            
    }
    
    const value = useMemo(() => {
        return {
            connectWeb3: connect,
            ...state,
        }
    }, [state])//

    //retourn le provider avec la value qui vaut notre state global
    return <Provider value={value}>{children}</Provider>
}
export default Web3Provider;