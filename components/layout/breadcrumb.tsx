import Link from 'next/link';
import React from 'react';

interface IParents {
    title: string;
    path: string;
}

interface IBreadcrumbProps {
    parents: IParents[]
    title: string;

}

const Breadcrumb: React.FC<IBreadcrumbProps> = ( {parents, title} ) => {

    return (
        <nav aria-label="breadcrumb" >
            <ol>
                <li>
                    <Link href={'/'}>
                        <a>Accueil</a>
                    </Link>
                </li>

                { parents.map( (parent, index) => (
                    <li key={index}>
                        <Link href={parent.path}>
                            <a>{parent.title}</a>
                        </Link>
                    </li>
                ) ) }
                <li aria-current="page">{ title }</li>
            </ol>
        </nav>
    );
}

export default Breadcrumb;