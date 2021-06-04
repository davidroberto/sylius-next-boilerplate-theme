import { ITaxon } from '../../types/resources/taxonTypes';
import { getTaxonRelativeUrl } from '../../lib/api/urls';
import Link from 'next/link';
import { getResourceTranslation } from '../../lib/api/resources/common';

interface IMainMenuProps {
    taxons: ITaxon[]
}

const MainMenu: React.FC<IMainMenuProps> = ({ taxons }) => {
    return (
        <nav>
            <ul>
                {taxons.map((taxon, index) => {
                    return(
                        <li key={index}>
                            <Link href={getTaxonRelativeUrl(taxon)}>
                                <a>{getResourceTranslation(taxon).name}</a>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>

    );
}

export default MainMenu;

