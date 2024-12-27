import { ReactNode, Suspense } from "react";
import Searchbar from "../../components/searchbar";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Suspense // children으로 있는 컴포넌트를 서버 사이드 사전 렌더링에서 제외되도록 한다!
        fallback={<div>Loading...</div>} // 해당 컴포넌트의 비동기 작업이 종료된 시점 (useSearchParams 훅으로 클라이언트 사이드에서 쿼리 파라미터를 불러왔을 때, 브라우저에 마운트 되었을 때!)까지 fallback props로 전달해준 요소가 렌더링 되도록 한다.
      >
        <Searchbar />
      </Suspense>
      {children}
    </div>
  );
}
 