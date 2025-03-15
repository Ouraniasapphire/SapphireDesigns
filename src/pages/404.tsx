import type { Component } from 'solid-js';
import Card from '../components/Card';

const NotFound: Component = () => {
    return (
        <>
            <div class="center-content">
                <Card >

                    <span style={"text-align: center;"}>
                        <h1 style={"font-size: 4rem"}>
                            404 Not Found!
                        </h1>
                        <h3 style={"color: #303030"}>
                            How did you get here?
                        </h3>
                    </span>

                </Card>
            </div>
        </>
    )
}

export default NotFound;