import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Oauth() {
  const { push } = useRouter();
  const [notionLink, setNotionLink] = useState(
    process.env.NEXT_PUBLIC_NOTION_OAUTH_LINK
  );

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
    </>
  );
}
