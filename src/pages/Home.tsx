import type { Component } from 'solid-js';
import Card from '../components/Card';

const Home: Component = () => {
    return (
        <>
            <div class="container">
                <Card >
                    <div class="grid-container">
                        <img src="/Sapphire-Designs.png" alt="logo" id="home-logo"/> 
                        <span id="home-title"> Sapphire <br /> Designs </span>
                    </div>
                </Card>
            </div>
        </>
    )
}

export default Home;