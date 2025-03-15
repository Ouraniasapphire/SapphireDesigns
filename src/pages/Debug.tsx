import type { Component } from 'solid-js';
import { createSignal, onCleanup } from 'solid-js';

const Debug: Component = () => {
    const [log, setLog] = createSignal<string[]>(["Processing Information..."]); 
    const userAgent = window.navigator.userAgent;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const screenWidth = screen.width;
    const screenHeight = screen.height;
    const pixelRatio = window.devicePixelRatio;
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isMobile = /Mobi|Android/i.test(userAgent);
    const osMemory = "deviceMemory" in navigator ? `${navigator.deviceMemory} GB` : "Unknown";
    const numCPUs = navigator.hardwareConcurrency || "Unknown";
    const browserLanguage = navigator.language;
    const browserLanguages = navigator.languages;

    const Commands = [

        `User Agent: ${userAgent}`,
        `Screen Resolution: ${screenWidth}x${screenHeight}`,
        `CPUs Detected: ${numCPUs}`
        , `OS Memory: ${osMemory}`,
        `Viewport Size: ${viewportWidth}x${viewportHeight}`,
        `Pixel Ratio: ${pixelRatio}`,
        `Touch Support: ${isTouch ? "Yes" : "No"}`,
        `Mobile Device: ${isMobile ? "Yes" : "No"}`,
        `Browser Language: ${browserLanguage}`,
        `Browser Languages: ${browserLanguages.join(", ")}`,

    ];

    let logIndex = 0;
    const interval = setInterval(() => {
        if (logIndex < Commands.length) {
            setLog((prev) => [...prev, Commands[logIndex++]]);
        } else {
            clearInterval(interval);
        }
    }, 1000);

    onCleanup(() => clearInterval(interval));

    return (
        <div style={{
            "color": "#0f52ba", 
            "padding": "20px",
            "white-spacer": "pre-line",
            "overflow": "auto",
            "height": "100vh",
        }}>
            
            <br />
            <div>
                <h1>Debug Information</h1>
                {log().map(line => (
                    <div style="margin: 1rem"> - {line} </div>
                    
                ))}
            </div>
        </div>
    );
}

export default Debug;
