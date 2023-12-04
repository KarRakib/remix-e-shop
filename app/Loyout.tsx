import type { ReactNode } from 'react';
import Navbar from './components/Navbar';
import CartModal from './components/CartModal';

const LoyOut = ({children}:{children:ReactNode}) => {
    return (
        <div>
            <Navbar/>
            <main>{children} </main>
            <CartModal/>
        </div>
    );
};

export default LoyOut;