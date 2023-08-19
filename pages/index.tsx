import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  return (
    <>
      <h1>oauth-test</h1>
      <button onClick={() => router.push("/oauth")}>Go To Test</button>
    </>
  );
}
