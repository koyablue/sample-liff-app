import { useEffect, useState } from "react";
import liff from "@line/liff";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    // liff
    //   .init({
    //     liffId: import.meta.env.VITE_LIFF_ID,
    //     withLoginOnExternalBrowser: true,
    //   })
    //   .then(() => {
    //     setMessage("LIFF init succeeded.");
    //     console.log("isLoggedIn:", liff.isLoggedIn());
    //   })
    //   .catch((e: Error) => {
    //     setMessage("LIFF init failed.");
    //     setError(`${e}`);
    //   });
    const initializeLiff = async () => {
      try {
        await liff.init({
          liffId: import.meta.env.VITE_LIFF_ID,
          withLoginOnExternalBrowser: true,
        });
        setMessage("LIFF init succeeded.");
        console.log("isLoggedIn:", liff.isLoggedIn());
        const prof = await liff.getProfile();
        setName(prof.displayName);
      } catch (e: any) {
        setMessage("LIFF init failed.");
        setError(`${e}`);
      }
    };

    initializeLiff();
  }, []);

  return (
    <div className="App">
      <h1>create-liff-app</h1>
      {message && <p>{message}</p>}
      {error && (
        <p>
          <code>{error}</code>
        </p>
      )}
      <a
        href="https://developers.line.biz/ja/docs/liff/"
        target="_blank"
        rel="noreferrer"
      >
        LIFF Documentation
      </a>
      {`Hello ${name}`}
    </div>
  );
}

export default App;
