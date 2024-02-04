import type { MetaFunction } from "@remix-run/node";
import { useNavigate } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  // const packageList:any = useFetcher();
  const navigate = useNavigate();
  navigate("/favourite");

  return <div>hi this is the index page.</div>;
}
