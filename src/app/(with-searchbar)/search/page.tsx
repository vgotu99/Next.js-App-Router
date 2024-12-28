import BookItem from "@/components/book-item";
import { BookData } from "@/types";
import { Suspense } from "react";

const SearchResult = async ({ q }: { q: string }) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/search?q=${q}`,
    {
      cache: "force-cache",
    }
  );
  const searchedBook: BookData[] = await res.json();

  if (!res.ok) return <div>오류가 발생했습니다...</div>;
  return (
    <div>
      {searchedBook.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
};

export default function Page({
  searchParams,
}: {
  searchParams: {
    q?: string;
  };
}) {
  return (
    <Suspense // Suspense를 이용해서 children으로 있는 컴포넌트가 스트리밍되도록 설정할 수 있다.
      fallback={<div>Loading...</div>} // 대체 UI
      key={searchParams.q || ''} // key props의 값을 변경하게되면 리액트는 Suspense 컴포넌트가 업데이트 것을 인지하게되므로 key의 값이 변경될 때마다 로딩이 필요할 때 대체 UI가 렌더링되도록 한다. | loading.tsx 컴포넌트를 이용한 페이지 스트리밍과는 달리 경로가 아닌 쿼리가 달라질 때도 로딩 UI를 렌더링할 수 있다.
    >
      <SearchResult q={searchParams.q || ""} />
    </Suspense>
  );
}
