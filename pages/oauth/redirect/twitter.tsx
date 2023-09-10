import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function TwitterOAuthRedirect() {
  const router = useRouter();
  const [code, setCode] = useState<string | null>(null);
  const [state, setState] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<string>("");

  const getCookie = (name: string) => {
    const nameEQ = name + "=";
    const ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  };

  const getTwitterToken = async (code: string) => {
    const headers = {
      Authorization: "Bearer discordToken",
      provider: "discord",
    };
    const randomString = getCookie("randomString");
    const body = {
      code: code,
      code_verifier: randomString,
    };

    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:3001/v1/user-tools/twitter",
        headers: headers,
        data: body,
      });
      console.log(response.data);
      if (response.data.status) {
        console.log(response.data);
        setAccessToken(response.data.data.oauthResposne.access_token);
      } else {
        setAccessToken("Error");
      }
    } catch (error: any) {
      console.error(
        "Error retrieving Notion token:",
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    if (router.query.code) {
      setCode(router.query.code as string);
    }
    if (router.query.state) {
      setState(router.query.state as string);
    }
  }, [router.query]);

  useEffect(() => {
    if (code) {
      getTwitterToken(code);
    }
  }, [code]);

  return (
    <>
      <h1>Twitter OAuth Successfully Finished!</h1>
      <p>code: {code}</p>
      <p>state: {state}</p>
      <p>I will send this code to Server</p>
      <p>and this is the access token: {accessToken}</p>
    </>
  );
}
