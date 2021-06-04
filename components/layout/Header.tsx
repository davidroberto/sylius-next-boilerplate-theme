import { ITaxon } from '../../types/resources/taxonTypes';
import Link from 'next/link';
import React, { useEffect, useContext } from 'react';
import { getOrderFromCookie, removeOrderFromCookie } from '../../lib/api/resources/cart';
import CartContext from '../CartContext';
import MessageContext from '../MessageContext';
import Image from 'next/image';
import MainMenu from './MainMenu';
import { useRouter } from 'next/dist/client/router';
import LoadingContext from '../LoadingContext';

interface IHeaderProps {
    taxons: ITaxon[]
}

const Header: React.FC<IHeaderProps> = ({taxons}) => {

    const { cart, setCart } = useContext(CartContext);
    const { message } = useContext(MessageContext);
    const { setLoading } = useContext(LoadingContext); 
    const router = useRouter();

    useEffect(() => {
        (async () => {
            const order = await getOrderFromCookie();

            if (order) {
                setCart(order);
            } else {
                if (router.pathname !== "panier/paiement") {
                    removeOrderFromCookie();   
                }
            }     
        })();
    }, []);

    const onSubmitSearch = (event: React.FormEvent<HTMLFormElement>) => {
        setLoading(true);
        event.preventDefault();
        const target = event.target as HTMLFormElement;
        const search = target.search.value;

        router.push({
           pathname: '/recherche',
           query: {
               'search': search
           }
        });
    }

    return (
        <>
            <header>
            
                <form onSubmit={(event) => onSubmitSearch(event)}>
                    <label htmlFor="search">Search</label>
                    <button type="submit">Search</button>
                    <input type="search" name="search" placeholder="Search products..." required />
                </form>
                        
                <Link href={"/"} >
                    <a>
                        <Image
                            src="/assets/images/sylius.png" 
                            alt="Sylius"
                            width="100px"
                            height="29.33px"
                        />
                    </a>
                </Link>

                <div>    
                    <Link href={"/account/login"}>
                        <a>My account</a>
                    </Link>
                </div>   
                
                <Link href={"/cart"}>
                    <a>
                        <span>{cart ? cart.items.length + 'items' : '0 item'} in cart</span>
                    </a>
                </Link>

                <MainMenu taxons={taxons}/>

            </header>

            { message &&
                <div className={`${message.type}`} >
                    <p>{message.message}</p>
                </div>
            }
        </>
    );

}

export default Header;