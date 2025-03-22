import type { Component } from 'solid-js';
import { createSignal } from 'solid-js';

function sendKey(key) {
    const event = new KeyboardEvent('keydown', {
        key,
        code: key,
        keyCode: key === 'Enter' ? 13 : 16, // 13 for Enter, 16 for Shift
        which: key === 'Enter' ? 13 : 16,
        bubbles: true,
    });

    document.dispatchEvent(event);
}

const Sapphire: Component = () => {
    return (
        <>
            <iframe
                style='width: 100dvw;'
                src='https://gba.js.org/player/#pokemonsapphire'
                title='Pokémon Sapphire'
            />
        </>
    );
};

export default Sapphire;
