import { BCVTasaStore } from '@/store/bcv';
import { Navbar as NavBarFlowBite, NavbarBrand } from 'flowbite-react';

export const NavBar = () => {
    const BCVTasaAmount = BCVTasaStore.getState().tasa.amount;
    return (
        <NavBarFlowBite fluid rounded>
            <NavbarBrand href="/">
                <img
                    src="https://www.boneappetit.food/cdn/shop/files/wepik--20240711111514MpmI.png?v=1720696543&width=60"
                    className="mr-3 h-6 sm:h-9"
                    alt="Flowbite React Logo"
                />
                <span className="self-center whitespace-nowrap text-xl font-semibold ">
                    Bone Appetit Food
                </span>
            </NavbarBrand>
            <div>
                <span className="self-center whitespace-nowrap text-xl font-semibold ">
                    {`Tasa: Bs. ${String(BCVTasaAmount).replace('.', ',')}`}
                </span>
            </div>
        </NavBarFlowBite>
    );
};
