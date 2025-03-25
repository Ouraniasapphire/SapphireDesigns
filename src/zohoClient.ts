export const ZOHO = {
    EMAIL: import.meta.env.ZOHO_EMAIL,
    PASS: import.meta.env.ZOHO_PASS,
};

if (!ZOHO.EMAIL || !ZOHO.PASS) {
    throw new Error('Missing Zoho credentials. Ensure they are set in your environment variables.');
}
