import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import "./App.css";
import Hello from "./features/counter/Hello";
import World from "./features/counter/World";

function App() {
  const [currentPage, setCurrentPage] = useState("home");

  // Listen for changes in the URL path
  useEffect(() => {
    const handlePathChange = () => {
      const path = window.location.pathname;
      setCurrentPage(path.slice(1)); // Remove leading slash
    };

    // Add event listener for popstate event
    window.addEventListener("popstate", handlePathChange);

    // Call handlePathChange to initialize currentPage
    handlePathChange();

    // Cleanup event listener
    return () => {
      window.removeEventListener("popstate", handlePathChange);
    };
  }, []);

  // Update URL path and current page when button is clicked
  const handleButtonClick = (page) => {
    setCurrentPage(page);
    window.history.pushState(null, "", `/${page}`);
  };

  // Determine which component to render based on the current page
  let currentComponent;
  switch (currentPage) {
    case "hello":
      currentComponent = <Hello />;
      break;
    case "world":
      currentComponent = <World />;
      break;
    default:
      currentComponent = null; // Render nothing for other paths
  }

  return (
    <div className="App">
      <header className="App-header">
        <img
          src={logo}
          className="App-logo"
          alt="logo"
        />
        <Counter />
        <button onClick={() => handleButtonClick("hello")}>Hello</button>
        <button onClick={() => handleButtonClick("world")}>World</button>

        {currentComponent}
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <span>
          <span>Learn </span>
          <a
            className="App-link"
            href="https://reactjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux-toolkit.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux Toolkit
          </a>
          ,<span> and </span>
          <a
            className="App-link"
            href="https://react-redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React Redux
          </a>
        </span>
      </header>
    </div>
  );
}

export default App;
