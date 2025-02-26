import type { Component } from 'solid-js';
import Card from '../components/Card';

const Home: Component = () => {
    return (
        <>
            <div class="centered-container">
                <Card >
                    <div class="grid-item-container" style="align-items: center; justify-items: center;">
                        <img src="/Sapphire-Designs.png" alt="logo" id="card-image"/> 
                        <span id="home-title">Sapphire<br/>Designs</span>
                    </div>
                </Card>
            </div>
        </>
    )
}

export default Home;