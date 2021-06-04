import Head from 'next/head'
import Header from './Header';
import Footer from './Footer';
import { ITaxon } from '../../types/resources/taxonTypes';
import { ReactNode, useContext } from 'react';
import LoadingOverlay from '../features/LoadingOverlay';
import LoadingContext from '../LoadingContext';

interface LayoutProps {
    taxons: ITaxon[],
    children: ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children, taxons }: LayoutProps) => {

    const { isLoading } = useContext(LoadingContext);

    return (
        <>
            {isLoading &&
                <LoadingOverlay />
            }
            <Header taxons={taxons} />
            <main>
                {children}
            </main>
            <Footer />
        </>
    );
}

export default Layout;