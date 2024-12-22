import type { Component } from 'solid-js';
import Card from '../components/Card';

const About: Component = () => {
    return (
        <>
            <div class="container">
                <Card >
                    <span style="text-align: center;">
                        <h1> About Jack </h1> <h1 style={"color: #0084FF "}>(Sapphire)</h1>
                        <br />
                        <p> Sapphire the artist behind Sapphire Designs. They aspire to be a leader in CS and the design behind it. They are a CS student, web developer, programmer, and much more.
                        Sapphire Designs is an outlet for their art and a way to gain experience. Please check the Pricing page for the listed products & offers!</p>
                        <br />
                        <h2 style={"color: #0084FF "}>helakjack@gmail.com</h2>
                    </span>
                </Card>
            </div>
        </>
    )
}

export default About;