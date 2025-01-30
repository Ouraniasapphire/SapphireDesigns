import type { Component } from 'solid-js';
import Card from '../components/Card';

const Pricing: Component = () => {
    return (
        <>
            <div class="container"> 
                <div class="grid-container" style={"justify-items: center"}>
                    <Card style={{"text-align": "center", "justify-items": "center", width: "25vw"}}>
                        <h1 style={"color: #0084FF"}> Standard Logo </h1>
                        <img src="/Ratio.png" id="home-logo" alt="Ratio-Logo"/>
                        <h1> $49.99 USD </h1>
                        <h2 >£40.99 GBP</h2>
                    </Card>

                </div>
            </div>
        </>
    )
}

export default Pricing;