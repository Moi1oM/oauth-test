import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function GithubOAuthRedirect() {
  const router = useRouter();
  const [code, setCode] = useState<string | null>(null);
  const [state, setState] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<string>("");

  const getGithubToken = async (code: string) => {
    const headers = {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_DISCORD_ACCESS_TOKEN}`,
      provider: "discord",
    };
    const body = {
      code: code,
    };

    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:8000/v1/user-tools/github",
        headers: headers,
        data: body,
      });
      if (response.data.status) {
        setAccessToken(response.data.data.access_token);
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
      getGithubToken(code);
    }
  }, [code]);

  return (
    <>
      <h1>github OAuth Successfully Finished!</h1>
      <p>code: {code}</p>
      <p>state: {state}</p>
      <p>I will send this code to Server</p>
      <p>and this is the access token: {accessToken}</p>
    </>
  );
}
