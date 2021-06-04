import Link from "next/link";
import { useRouter } from "next/router";
import { MouseEventHandler, useContext } from "react";
import { logoutCustomer } from '../../lib/resource/customer';
import MessageContext from "../MessageContext";

interface IAccountNavProps {
    current: string;
}

const AccountNav: React.FC<IAccountNavProps> = ({ current }) => {

    const router = useRouter();
    const { setMessage } = useContext(MessageContext);

    const onClickLogout = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();

        setMessage({
            'message': 'You have been logged out',
            'type': 'success'
        });
        
        logoutCustomer(router);
    }

    return (
       
        <nav>
            <ul role="tablist">
                <li className={`${current === 'account' && 'active'}`}>
                    <Link href={'/account'}>
                        <a>My informations</a>
                    </Link>
                </li>
                <li className={` ${current === 'password' && 'active'}`}>
                    <Link href={'/account/password'}>
                        <a>Modify my password</a>
                    </Link>
                </li>
                <li className={` ${current === 'orders' && 'active'}`}>
                    <Link href={'/account/orders'}>
                        <a>My orders</a>
                    </Link>
                </li>
                <li className="">
                    <a href={"#"} onClick={(event) => onClickLogout(event)}>Se déconnecter</a>
                </li>
            </ul>
        </nav>
    );
}

export default AccountNav;