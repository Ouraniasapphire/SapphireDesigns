import { createSignal, Component } from 'solid-js';
import { supabase } from '../supabaseClient';

/**
 * Newsletter component for managing and sending email newsletters.
 *
 * This component allows users to input an email title and HTML content,
 * and sends the composed email to all confirmed recipients in the
 * 'newsletter_emails' table of the Supabase database.
 *
 * Signals:
 * - title: Holds the email title.
 * - htmlContent: Holds the HTML content of the email.
 * - loading: Represents the loading state while sending emails.
 *
 * Functions:
 * - handleSendEmail: Asynchronously handles the process of fetching
 *   confirmed recipient emails from Supabase, and sending the email
 *   using the '/api/send-email' endpoint.
 *
 * The component renders a form to input the email title and HTML content,
 * along with a button to trigger the email sending process.
 */

const Newsletter: Component = () => {
    const [title, setTitle] = createSignal('');
    const [htmlContent, setHtmlContent] = createSignal('');
    const [loading, setLoading] = createSignal(false);

    const handleSendEmail = async () => {
        setLoading(true);

        const { data: emails, error } = await supabase.from('newsletter_emails').select('email');

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
        <div class='auth-container'>
            <span class='form-wrapper form'>
                <textarea
                    style='width: 100%; min-width: 100%;'
                    id='html-content'
                    value={htmlContent()}
                    onInput={(e) => setHtmlContent(e.target.value)}
                    placeholder='Enter HTML content'
                />
            </span>

            <span class='form-wrapper form'>
                <input
                    id='title'
                    type='text'
                    value={title()}
                    onInput={(e) => setTitle(e.target.value)}
                    placeholder='Enter email title'
                />
                <button class='center' onClick={handleSendEmail} disabled={loading()}>
                    {loading() ? 'Sending...' : 'Send Email'}
                </button>
            </span>
        </div>
    );
};

export default Newsletter;
