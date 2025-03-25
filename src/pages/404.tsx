import { createSignal, onCleanup, onMount, type Component } from 'solid-js';
import { useNavigate } from '@solidjs/router';
import Card from '../components/Card';

const NotFound: Component = () => {
    const [countdown, setCountdown] = createSignal(5);
    const navigate = useNavigate();

    onMount(() => {
        const interval = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    navigate('/');
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        onCleanup(() => clearInterval(interval)); // Ensure cleanup on unmount
    });

    return (
        <>
            <div class='center-content'>
                <Card>
                    <span style='text-align: center;'>
                        <h1 style='font-size: 4rem'>404 Not Found!</h1>
                        <div style='text-align: center; font-size: 1.5rem;'>
                            Redirecting in {countdown()} seconds...
                        </div>
                    </span>
                </Card>
            </div>
        </>
    );
};

export default NotFound;
