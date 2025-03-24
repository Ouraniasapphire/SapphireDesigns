import { A } from '@solidjs/router';

const Navbar = () => {
    return (
        <nav class='navbar box-shadow'>
            <div class='navbar-container'>
                <div class='navbar-left'>
                    <img
                        src='/Sapphire-Designs.png'
                        alt='logo'
                        style='height: 2.5rem; width: auto;'
                    />
                    <span id='Name'>
                        <A href='/'> Sapphire Designs </A>
                    </span>
                </div>
                <div class='navbar-right'>
                    <A href='/about'>About</A>
                    <A href='/gallery'>Gallery</A>
                    <A href='/pricing'>Pricing</A>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
