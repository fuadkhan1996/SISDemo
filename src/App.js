import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import axios from "axios";

const DEFAULT_AUTH_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyLCJleHAiOjE2NDA0OTQxNjh9.7Eem_UvBkxtFDOCaJ0aO-9sFQPaFXAYgxFsnhxDndJ0";
const BASE_URL = "http://localhost:3000/";
const API_INSURANCE_APPLICATION_URL =
  BASE_URL + "api/v1/insurance_applications?";
const BASE_API_URL = BASE_URL + "api/v1/";

function useQuery() {
  return new queryString.parse(useLocation().search);
}

function App() {
  let query = useQuery();
  const [url, setUrl] = useState(
    BASE_URL +
      "dashboard/applications/arden_community_association_applications/1/edit?agent_auth_token=" +
      DEFAULT_AUTH_TOKEN
  );

  useEffect(() => {
    getUrlForIFrame();
  }, []);

  const getUrlForIFrame = async () => {
    const headers = {
      "AUTH-TOKEN": query.agent_auth_token,
      "Content-Type": "application/json",
    };

    const response = await axios.get(
      API_INSURANCE_APPLICATION_URL + queryString.stringify(query),
      { headers }
    );
    setUrl(response.data.link);
  };

  return (
    <div className="App">
      <iframe
        id="datacrest-iframe"
        src={url}
        style={{ width: "100%", height: "100vh" }}
      ></iframe>
    </div>
  );
}

export default App;
