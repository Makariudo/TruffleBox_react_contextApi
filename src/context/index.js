import React, { createContext } from 'react';

export const Web3Context = createContext();

//withContext HOC prends un Component et le renvoi avec ses props et la value du context WEb3
const withContext = Component => props => {
    return <Web3Context.Consumer>{value => <Component value={value} {...props} />}</Web3Context.Consumer>
}
export default withContext