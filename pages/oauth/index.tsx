import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Oauth() {
  const { push } = useRouter();
  const [notionLink, setNotionLink] = useState(
    process.env.NEXT_PUBLIC_NOTION_OAUTH_LINK
  );
  const [slackLink, setSlackLink] = useState(
    process.env.NEXT_PUBLIC_SLACK_OAUTH_LINK
  );
  const [githubLink, setGithubLink] = useState(
    process.env.NEXT_PUBLIC_GITHUB_OAUTH_LINK
  );
  const [twitterLink, setTwitterLink] = useState(
    process.env.NEXT_PUBLIC_TWITTER_OAUTH_LINK
  );

  const setCookie = (name: string, value: string, days: number) => {
    let expires = "";
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  };

  const getRandomString = () => {
    const randomString =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);

    setCookie("randomString", randomString, 1); // Sets cookie to expire in 1 day
    console.log(document.cookie);

    return randomString;
  };
  const getGoogleOAuth = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_DISCORD_ACCESS_TOKEN}`,
        provider: "discord",
      };
      const res = await axios.post(
        "http://localhost:8000/v1/user-tools/google",
        {},
        { headers }
      );
      const { data } = res;
      console.log(data);
      if (data.status) {
        push("/oauth/redirect/google");
      }
    } catch (error: any) {
      console.error(
        "Error during Google OAuth:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <>
      <button onClick={() => push(notionLink!)}>Notion</button>
      <br />
      <button onClick={getGoogleOAuth}>Google</button>
      <br />
      <button onClick={() => push(slackLink!)}>Slack</button>
      <br />
      <button onClick={() => push(githubLink!)}>Github</button>
      <br />
      <button onClick={() => push(twitterLink! + getRandomString())}>
        Twitter
      </button>
    </>
  );
}
