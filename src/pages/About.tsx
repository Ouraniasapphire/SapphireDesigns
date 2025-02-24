import type { Component } from 'solid-js';
import Card from '../components/Card';

const About: Component = () => {
    return (
        <>
            <div class="centered-container">
                <Card  >
                    <span style="text-align: center; overflow-y: auto;">
                        <h1 style={"color: #0084FF "}>Sapphire Designs</h1>
                        <br />
                        <p> Sapphire Designs is an independent design company. </p>
                        <p> We operate with cheap prices and high efficiency. </p>
                        <br />
                        <h3 style={"color: #0084FF "}>helakjack@gmail.com</h3>
                    </span>
                </Card>
            </div>
        </>
    )
}

export default About;