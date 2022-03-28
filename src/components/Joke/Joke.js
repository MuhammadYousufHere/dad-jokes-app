import React from "react";
import loaderGif from "./../assets/load2.gif";
import { useEffect, useState } from "react";
// import { useStateIfMounted } from "use-state-if-mounted";
import axios from "axios";
import "./Joke.scss";
import laughing from "./../assets/laughing.svg";

const Joke = () => {
  // hooks can only be used functional comp
  const [joke, setJoke] = useState("");
  const [loading, setLoader] = useState(true);
  const [nextJoke, setNextJoke] = useState(false);
  useEffect(() => {
    const config = {
      headers: {
        Accept: "application/json",
      },
    };
    setLoader(true);
    axios
      .get("https://icanhazdadjoke.com", config)
      .then((res) => {
        setJoke(res.data.joke);
        setLoader(false);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
    // empty array b/c telling UE on what its dependent on, if we dont include
    // it will have an endless loop of getting joke over & over again.
  }, [nextJoke]);

  return (
    <div className="container">
      <img id="laughImg" src={laughing} alt="" />
      <h3>Don't Laugh Challenge!</h3>
      {loading ? (
        <img
          src={loaderGif}
          alt="loading"
          style={{ width: "100px", marginTop: "12px" }}
        />
      ) : (
        <div id="joke" className="joke">
          {joke}
        </div>
      )}
      <br />
      <button id="jokeBtn" onClick={() => setNextJoke(!nextJoke)} className="btn">
        Get Another Joke
      </button>
    </div>
  );
};
export default Joke;
