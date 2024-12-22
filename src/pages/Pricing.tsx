import type { Component } from 'solid-js';
import Card from '../components/Card';

const Pricing: Component = () => {
    return (
        <>
            <div class="grid-container" style={"justify-items: center"}>
                <Card style={{"text-align": "center"}}>
                     <h1 style={"color: #0084FF"}> Standard Logo </h1>
                     <img src="/Ratio-Logo.png" id="home-logo" alt="Ratio-Logo"/>
                     <h1> $49.99 USD </h1>
                </Card>

                <Card style={{"text-align": "center"}}>
                    <h1 style={"color: #0084FF"}> Standard UI </h1>
                    <img src="/Ratio-UI.png" id="home-logo" alt="Ratio-UI"/>
                    <h1> $99.99 USD </h1>
                </Card>

                
                <Card style={{"text-align": "center"}} >
                    <h1 style={"color: #0084FF"}> Discounts</h1>
                    <br />
                    <h3 > 50% off with submission of Teacher ID</h3>
                    <br />
                    <h3 > 25% off with submission of Student ID</h3>
                </Card>

            </div>
        </>
    )
}

export default Pricing;