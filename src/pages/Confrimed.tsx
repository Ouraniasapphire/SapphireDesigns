import { createSignal, onMount } from 'solid-js';
import { useSearchParams } from '@solidjs/router';
import { supabase } from '../supabaseClient';

const Confirmed = () => {
    const [message, setMessage] = createSignal('Confirming your subscription...');
    const [searchParams] = useSearchParams();

    onMount(async () => {
        const token = searchParams.token;
        if (!token) {
            setMessage('Invalid confirmation link.');
            return;
        }

        const { data, error } = await supabase
            .from('newsletter_emails')
            .update({ confirmed: true })
            .eq('confirmation_token', token)
            .select();

        if (error || !data.length) {
            setMessage('Confirmation failed. Your token may be invalid or already used.');
        } else {
            setMessage('Subscription confirmed! Thank you for subscribing.');
        }
    });

    return (
        <div class='center-content'>
            <h1>{message()}</h1>
        </div>
    );
};

export default Confirmed;
