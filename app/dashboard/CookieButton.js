import React from "react";
import { Button } from "react-native";
import Cookies from "js-cookie";

export default function CookieButton() {
  const GetCookie = () => {
    alert(Cookies.get("my-key"));
  };

  return <Button title="Get Cookie" onPress={GetCookie} />;
}
