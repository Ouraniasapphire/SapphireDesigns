import type { Component } from 'solid-js';
import Card from '../components/Card';

const Home: Component = () => {
    return (
        <>
            <div class='center-content'>
                <Card>
                    <div class='grid-layout' style='align-items: center; justify-items: center;'>
                        <img src='/Sapphire-Designs.png' alt='logo' id='image-card' />
                        <span id='home-header'>
                            Sapphire
                            <br />
                            Designs
                        </span>
                    </div>
                </Card>
            </div>
        </>
    );
};

export default Home;
