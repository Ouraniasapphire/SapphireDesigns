import { createSignal, Component } from 'solid-js';
import { createClient } from '@supabase/supabase-js';

const Newsletter: Component = () => {
    const [title, setTitle] = createSignal('');
    const [htmlContent, setHtmlContent] = createSignal('');
    const [loading, setLoading] = createSignal(false);
    const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_KEY);

    const handleSendEmail = async () => {
        setLoading(true);

        const { data: emails, error } = await supabase
            .from('newsletter_emails')
            .select('email');

        if (error) {
            alert('Error fetching emails: ' + error.message);
            setLoading(false);
            return;
        }

        const emailData = {
            title: title(),
            htmlContent: htmlContent(),
            recipients: emails.map((row) => row.email),
        };

        try {
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(emailData),
            });

            if (!response.ok) {
                throw new Error('Failed to send email');
            }

            alert('Email sent successfully!');
        } catch (err) {
            alert('Error sending email: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div class="auth-container">
            <span class="form-wrapper form">
                <textarea
                    style="width: 100%; min-width: 100%;"
                    id="html-content"
                    value={htmlContent()}
                    onInput={(e) => setHtmlContent(e.target.value)}
                    placeholder="Enter HTML content"
                />
            </span>
            
            <span class="form-wrapper form">
                <input
                    id="title"
                    type="text"
                    value={title()}
                    onInput={(e) => setTitle(e.target.value)}
                    placeholder="Enter email title" />
                <button onClick={handleSendEmail} disabled={loading()}>
                    {loading() ? 'Sending...' : 'Send Email'}
                </button>
            </span>
        </div>
    );
};

export default Newsletter;