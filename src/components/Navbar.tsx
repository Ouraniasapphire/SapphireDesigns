import { createSignal, onCleanup, onMount } from 'solid-js';
import { A } from '@solidjs/router';

const Navbar = () => {
    const [isOpen, setIsOpen] = createSignal(false);
    const [isMobile, setIsMobile] = createSignal(window.innerWidth < 768);

    // Function to update isMobile based on window size
    const updateViewport = () => setIsMobile(window.innerWidth < 768);

    // Handle clicks outside of the menu
    const handleClickOutside = (event) => {
        if (
            isOpen() &&
            !event.target.closest('.popup-menu') &&
            !event.target.closest('.menu-button')
        ) {
            setIsOpen(false);
        }
    };

    // Add event listeners
    onMount(() => {
        window.addEventListener('resize', updateViewport);
        document.addEventListener('click', handleClickOutside);
    });

    // Cleanup event listeners on unmount
    onCleanup(() => {
        window.removeEventListener('resize', updateViewport);
        document.removeEventListener('click', handleClickOutside);
    });

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
                    {isMobile() ? (
                        <>
                            <button
                                class='menu-button'
                                style='align-items: center'
                                onClick={() => setIsOpen(!isOpen())}
                            >
                                <img src='Waffle.png' class='icon' alt='Waffle' />
                            </button>
                            {isOpen() && (
                                <div class='popup-menu box-shadow'>
                                    <A href='/about'>About</A>
                                    <A href='/gallery'>Gallery</A>
                                    <A href='/pricing'>Pricing</A>
                                    <A href='/repo'>Repo</A>
                                </div>
                            )}
                        </>
                    ) : (
                        <>
                            <A href='/about'>About</A>
                            <A href='/gallery'>Gallery</A>
                            <A href='/pricing'>Pricing</A>
                            <A href='/repo'>Repo</A>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
