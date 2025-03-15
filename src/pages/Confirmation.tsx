import type { Component } from 'solid-js';
import Card from '../components/Card';

const Confirmation: Component = () => {
    return (
        <>
            <div class="center-content">
                <Card >

                    <span style={"text-align: center;"}>
                        <h1 style={"font-size: 4rem"}>
                            Email confirmed!
                        </h1>
                    </span>

                </Card>
            </div>
        </>
    )
}

export default Confirmation;