import type { Component } from 'solid-js';
import { createSignal } from 'solid-js';
import Card from '../components/Card';

const About: Component = () => {
    const [copied, setCopied] = createSignal(false);

    const copyEmail = async () => {
        const email = "sapphire@sapphire-designs.net";
        try {
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(email);
            } else {
                // Fallback for iOS
                const textArea = document.createElement("textarea");
                textArea.value = email;
                textArea.style.position = "absolute";
                textArea.style.opacity = "0";
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand("copy");
                document.body.removeChild(textArea);
            }
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy: ", err);
            alert("Failed to copy email. Please copy manually.");
        }
    };

    return (
        <div class="centered-container">
            <Card>
                <div style="text-align: center; overflow-y: auto; padding: 16px;">
                    <h1 style="font-size: 48px; color: #0084FF;">Sapphire Designs</h1>
                    <div class="grid-item-container" style="align-items: center; justify-items: center;">
                        <p style="max-width: 256px"> Sapphire Designs is an independent design company. </p>
                        <p style="max-width: 256px"> We operate with cheap prices and high efficiency. </p>
                    </div>
                    <h2 style="color: #0084FF; margin-top: 16px; cursor: pointer; user-select: all; touch-action: manipulation;" onclick={copyEmail}>
                        sapphire@sapphire-designs.net
                    </h2>
                    {copied() && <p style="color: #0084FF; font-size: 14px;">Copied to clipboard!</p>}
                </div>
            </Card>
        </div>
    );
};

export default About;
