import type { Component } from 'solid-js';
import { createSignal } from 'solid-js';
import { supabase } from '../supabaseClient';
import Card from '../components/Card';

const About: Component = () => {
    const [copied, setCopied] = createSignal(false);

    const copyEmail = async () => {
        const email = 'sapphire@sapphire-designs.net';
        try {
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(email);
            } else {
                // Fallback for iOS
                const textArea = document.createElement('textarea');
                textArea.value = email;
                textArea.style.position = 'absolute';
                textArea.style.opacity = '0';
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
            }
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy: ', err);
            alert('Failed to copy email. Please copy manually.');
        }
    };

    const RegisterEmail = () => {
        const [email, setEmail] = createSignal('');
        const [loading, setLoading] = createSignal(false);

        const generateToken = () => crypto.randomUUID(); // Generate a unique token

        const handleSubmit = async (e) => {
            e.preventDefault();
            setLoading(true);

            const token = generateToken();

            const { data, error } = await supabase
                .from('newsletter_emails')
                .insert([{ email: email(), confirmation_token: token, confirmed: false }]);

            if (error) {
                if (error.code === '23505') {
                    alert('Email already exists');
                } else {
                    alert('Error submitting email: ' + error.message);
                }
            } else {
                alert('Email submitted successfully! Check your inbox for confirmation.');

                // Send email using Vercel API
                await fetch('/api/send-confirmation', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: email(), token }),
                });

                setEmail('');
            }

            setLoading(false);
        };

        return (
            <div>
                <br />
                <div class='horizontal-divider' />
                <form class='auth-container' onSubmit={handleSubmit}>
                    <h3>Sign up for the newsletter!</h3>
                    <span class='form-wrapper form'>
                        <input
                            class='box-shadow flex'
                            id='about-input'
                            type='email'
                            value={email()}
                            onInput={(e) => setEmail(e.target.value)}
                            required
                            placeholder='Enter your email!'
                        />
                        <button
                            class='box-shadow flex'
                            id='about-button'
                            style='width: 5rem !important'
                            type='submit'
                            disabled={loading()}
                        >
                            <span class='center'>
                                <img src='svgs/mail.svg' class='icon' alt='Vercel' />
                            </span>
                        </button>
                    </span>
                </form>
            </div>
        );
    };

    return (
        <div class='center-content'>
            <Card>
                <div style='text-align: center; overflow-y: auto; padding: 16px overflow-y: scroll;;'>
                    <h1 style='font-size: 48px; color: #0084FF;'>Sapphire Designs</h1>
                    <div class='grid-layout' style='align-items: center; justify-items: center;'>
                        <p style='max-width: 256px'>
                            {' '}
                            Sapphire Designs is an independent design company.{' '}
                        </p>
                        <p style='max-width: 256px'>
                            {' '}
                            We operate with cheap prices and high efficiency.{' '}
                        </p>
                    </div>
                    <h3
                        style='text-decoration: underline; color: #0084FF; margin-top: 16px; cursor: pointer; user-select: all; touch-action: manipulation font-size: 1.5rem !important;'
                        onclick={copyEmail}
                    >
                        sapphire@sapphire-designs.net
                    </h3>
                    {copied() && (
                        <p style='color: #0084FF; font-size: 14px;'>Copied to clipboard!</p>
                    )}

                    <RegisterEmail />
                </div>
            </Card>
        </div>
    );
};

export default About;
