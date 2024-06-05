import { useUser } from "@/hooks/useUser";
import { serverURL } from "@/libs/const";
import "@/styles/globals.css";
import axios from "axios";
import type { AppProps } from "next/app";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const [user, setUser] = useUser();

  useEffect(() => {
      const token = localStorage.getItem("token");
      axios.get(serverURL + "/user/checkToken", {
        headers: {
          "Authorization": "Bearer " + token
        }
      })
      .then(({data}) => {
        setUser((data as any).user as any);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [])

  return <Component {...pageProps} />;
}
