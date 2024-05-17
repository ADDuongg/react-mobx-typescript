import React, { ReactNode, createContext, useContext } from 'react';
import Header from '../component/header';
import Footer from '../component/footer';
import mainStore from '../store/mainStore';

interface MasterProps {
    children: ReactNode
}
const storeContext = createContext(mainStore)

const Master = ({ children }: MasterProps) => {
    return (
        <storeContext.Provider value={mainStore}>
            <Header />
            {children}
            <Footer />
        </storeContext.Provider>
    );
}
export const useStore = () => useContext(storeContext)
export default Master;
