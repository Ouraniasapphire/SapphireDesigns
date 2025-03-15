import { createSignal } from "solid-js";

export default function NewsTest() {
  const [title, setTitle] = createSignal("");
  const [content, setContent] = createSignal("");
  const [message, setMessage] = createSignal("");

  const sendNewsletter = async () => {
    setMessage("Sending...");
    const response = await fetch("http://localhost:3001/send-newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: title(), content: content() }),
    });

    const result = await response.text();
    setMessage(result);
  };

  return (
    <div class="p-6 bg-gray-100 rounded-lg shadow-md w-full max-w-lg mx-auto">
      <h2 class="text-xl font-bold mb-4">Send Newsletter</h2>

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
