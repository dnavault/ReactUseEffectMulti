import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

import "./styles.css";

const username = "mayankshubham";
function App() {
  const [resp, setGitData] = useState({ data: null, repos: null });

  useEffect(() => {
    const fetchData = async () => {
      const respGlobal = await axios(
        `https://api.github.com/users/${username}`
      );
      const respRepos = await axios(
        `https://api.github.com/users/${username}/repos`
      );

      setGitData({ data: respGlobal.data, repos: respGlobal.data });
    };

    fetchData();
  }, []);

  console.log("render");
  if (resp.data) {
    console.log("d", resp.data, resp.repos);
  }

  return <h1>Hello</h1>;
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
