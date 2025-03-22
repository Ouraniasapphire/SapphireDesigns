import './styles/App.css';
import { A, useLocation } from '@solidjs/router';
import { lazy, createSignal, createEffect, Show, Suspense, onCleanup, onMount } from 'solid-js';
import Card from './components/Card';

const Loading = lazy(() => import('./components/Loader'));

const App = (props) => {
    const [loading, setLoading] = createSignal(false);
    const location = useLocation();
    const [isOnline, setIsOnline] = createSignal(navigator.onLine);
    const [wasOffline, setWasOffline] = createSignal(false); // New state to track if we were offline

    const updateOnlineStatus = () => {
        const currentOnlineStatus = navigator.onLine;
        setIsOnline(currentOnlineStatus);

        if (currentOnlineStatus) {
            if (wasOffline()) {
                window.location.reload(); // Reload the page if we were offline and are back online
            }
            setWasOffline(false); // Reset the flag when online
        } else {
            setWasOffline(true); // Set the flag when offline
        }
    };

    let timeout: string | number | NodeJS.Timeout;

    onMount(() => {
        window.addEventListener('online', updateOnlineStatus);
        window.addEventListener('offline', updateOnlineStatus);
    });

    onCleanup(() => {
        window.removeEventListener('online', updateOnlineStatus);
        window.removeEventListener('offline', updateOnlineStatus);
    });

    createEffect(() => {
        setLoading(true);

        timeout = setTimeout(() => {
            const overlay = document.querySelector('.loading-overlay');
            if (overlay) overlay.classList.add('fade-out');

            setTimeout(() => {
                setLoading(false);
            }, 500);
        }, 300);

        onCleanup(() => clearTimeout(timeout));
    });

    if (!isOnline()) {
        return (
            <div class='offline-overlay center-content'>
                <Card style={{ 'text-align': 'center', 'justify-items': 'center' }} id='card'>
                    <div class='grid-layout' style='align-items: center; justify-items: center;'>
                        <img src='/Sapphire-Designs.png' id='image-card' alt='Logo' />
                        <span id='pricing-header'> You are offline! </span>
                    </div>
                </Card>
            </div>
        );
    } else {
        return (
            <>
                <Suspense fallback={<div>Loading...</div>}>
                    <Show when={loading()}>
                        <Loading />
                    </Show>

                    <main class='app background'>
                        <nav class='navbar'>
                            <div class='navbar-container'>
                                <div class='navbar-left'>
                                    <img
                                        src='/Sapphire-Designs.png'
                                        alt='logo'
                                        style='height: 2.5rem; width: auto;'
                                    />
                                    <span id='Name'>
                                        <A href='/'> Sapphire Designs </A>
                                    </span>
                                </div>

                                <div class='navbar-right'>
                                    <A href='/about'>About</A>
                                    <A href='/gallery'>Gallery</A>
                                    <A href='/pricing'>Pricing</A>
                                </div>
                            </div>
                        </nav>

                        {props.children}
                    </main>
                </Suspense>
            </>
        );
    }
};

export default App;
