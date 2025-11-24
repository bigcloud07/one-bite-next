import { ReactNode, Suspense } from "react";
import Searchbar from "../../components/searchbar";

export default function Layout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div>
      <Suspense fallback={<div>로딩중...</div>}>
        <Searchbar /> 
        {/* 이러면 오직 클라이언트 측에서만 렌더링 되는것 */}
      </Suspense>
      {children}
    </div>
  );
}
