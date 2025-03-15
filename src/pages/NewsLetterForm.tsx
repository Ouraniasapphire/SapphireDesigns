import { createSignal } from "solid-js";

export default function NewsletterForm() {
  const [title, setTitle] = createSignal("");
  const [content, setContent] = createSignal("");
  const [message, setMessage] = createSignal("");

  const sendNewsletter = async () => {
    setMessage("Sending...");

    // Dynamically determine the URL depending on the environment (local or production)
    const apiUrl =
      process.env.NODE_ENV === "production"
        ? "sapphire-designs-website-hlvqvt1cv-sapphired89s-projects.vercel.app"
        : "http://localhost:3001/send-newsletter";

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: title(), content: content() }),
      });

      const result = await response.text();
      setMessage(result);
    } catch (err) {
      console.error("❌ Error:", err);
      setMessage("Failed to send the newsletter.");
    }
  };

  return (
    <div class="grid-layout form">
      <input
        type="text"
        placeholder="Newsletter Title"
        class="w-full p-2 border rounded mb-3"
        value={title()}
        onInput={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Enter HTML content"
        class="w-full p-2 border rounded mb-3 h-40"
        value={content()}
        onInput={(e) => setContent(e.target.value)}
      ></textarea>

      <button
        class="bg-blue-600 text-white p-2 rounded w-full"
        onClick={sendNewsletter}
      >
        Send Newsletter
      </button>

      {message() && <p class="mt-2 text-sm">{message()}</p>}
    </div>
  );
}
