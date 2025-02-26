import type { Component } from 'solid-js';
import Card from '../components/Card';

const Pricing: Component = () => {
    return (
        <>
            <div class="centered-container"> 
                
                <Card style={{"text-align": "center", "justify-items": "center"}} id='card'>
                    <h1 style={"color: #0084FF"}> Standard Logo </h1>

                    <div class="grid-item-container" style="align-items: center; justify-items: center;">
                        
                        <img src="/Ratio.png" id="card-image" alt="Ratio-Logo"/>
                        <span id="pricing-title"> $49.99 USD <br /> £40.99 GBP</span>
                    </div>

                </Card>
            </div>
        </>
    )
}

export default Pricing;