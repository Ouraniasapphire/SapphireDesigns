import type { Component } from 'solid-js';
import Card from '../components/Card';

const Pricing: Component = () => {
    return (
        <>
            <div class='center-content'>
                <Card style={{ 'text-align': 'center', 'justify-items': 'center' }} id='card'>
                    <h1 style={'color: #0084FF'}> Standard Logo </h1>

                    <div class='grid-layout' style='align-items: center; justify-items: center;'>
                        <img src='/Ratio.png' id='image-card' alt='Ratio-Logo' />
                        <span id='pricing-header'>
                            {' '}
                            $49.99 USD <br /> £40.99 GBP
                        </span>
                    </div>
                </Card>
            </div>
        </>
    );
};

export default Pricing;
