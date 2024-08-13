"use client";
import React, { useEffect } from "react";

type Props = {};

const AuthPage = (props: Props) => {
  useEffect(() => {
    if (chrome && chrome.runtime && chrome.runtime.sendMessage) {
      try {
        (async () => {
          const response = await chrome.runtime.sendMessage(
            "inpiomoiklpedpkniafpibekgkggmdph",
            {
              type: "GET_USER_INFO",
            }
          );
          console.log(response);
        })();
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log(
        "Chrome이 없습니다.",
        chrome,
        chrome.runtime,
        chrome.runtime.sendMessage
      );
    }
  }, []);

  return <div>Auth Page</div>;
};

export default AuthPage;
