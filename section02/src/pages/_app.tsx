import GlobalLayout from "@/components/global-layout";
import "@/styles/globals.css";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import { ReactNode } from "react";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactNode) => ReactNode; 
  // 원래 있는 넥스트 페이지에 메서드도 들어있어요! 라고 알려준다
};


export default function App({
  Component,
  pageProps
}: AppProps & {
  Component: NextPageWithLayout
}) {
  const getLayout = Component.getLayout ?? ((page: ReactNode) => page); 
  // getLayout 메서드가 없으면 그냥 페이지를 띄운다는 예외 처리

  return (
    <GlobalLayout>
      {getLayout(<Component {...pageProps} />)}
      {/* get */}
    </GlobalLayout>
  );
}


