import { Footer as FooterFlowBite, FooterCopyright } from 'flowbite-react';

export const Footer = () => {
    return (
        <FooterFlowBite container>
            <FooterCopyright
                href="https://www.boneappetit.food/"
                by="boneappetit.food"
                year={2025}
            />
        </FooterFlowBite>
    );
};
