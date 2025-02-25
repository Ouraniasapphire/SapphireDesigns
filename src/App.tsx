import "./styles/App.css";
import { A, useLocation } from "@solidjs/router";
import { lazy, createSignal, createEffect, Show, Suspense, onCleanup } from "solid-js";

const Loading = lazy(() => import("./components/Loader"));

const App = (props) => {
  const [loading, setLoading] = createSignal(false); 
  const location = useLocation(); 

  let timeout;

  createEffect(() => {
  
    setLoading(true);

   
    timeout = setTimeout(() => {
      const overlay = document.querySelector(".loading-overlay") as HTMLElement;
      if (overlay) overlay.classList.add("fade-out");

     
      setTimeout(() => {
        setLoading(false);
      }, 500); 
    }, 300);

    onCleanup(() => clearTimeout(timeout)); 
  });

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
       
        <Show when={loading()}>
          <Loading />
        </Show>


        <main class="app background">
          <nav class="navbar ">
            <div class="navbar-container">
              <div class="navbar-left">
                <img src="/Sapphire-Designs.png" alt="logo" style={"height: 2.5rem; width: auto;"}/> 
                <span id="Name"> <A href="/"> Sapphire Designs </A> </span>
              </div>

              <div class="navbar-right">
                <A href="/about">About</A>
                <A href="/gallery">Gallery</A>
                <A href="/pricing">Pricing</A>
              </div>
            </div>
          </nav>

          {props.children}

        </main>
      </Suspense>
    </>
  );
};

export default App;
