import BookItem from "@/components/book-item";
import style from "./page.module.css";
import { BookData } from "@/types";
import { Suspense } from "react";
import BookListSkeleton from "@/components/skeleton/book-list-skeleton";

// export const dynamic = "auto";
// // 특정 페이지의 유형을 강제로 Static 혹은 Dynamic 페이지로 설정하는 라우트 세그먼트 옵션 => 사용을 권장하지는 않는다.
// // 1. auto: 기본 값, 아무것도 강제하지 않고 기존 원칙에 따라 페이지의 유형이 정해진다.
// // 2. force-dynamic: Dynamic 페이지로 강제 설정한다.
// // 3. force-static: Static 페이지로 강제 설정한다. => 동적 값은 undefined가 되고 데이터 캐시는 캐싱되도록 {cache: "force-cache"}가 된다.
// // 4. error: Static 페이지로 강제 설정한다. => force-static과 같이 동작하지만 Static 페이지가 될 수 없는 페이지에 해당 옵션이 있다면 빌드 시 오류를 보여주며 빌드가 중단되도록 예외처리를 제공한다.

const AllBooks = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`, {
    // cache: "no-store", // cache: "no-store" 옵션: 캐싱x
    cache: "force-cache",
  }); // fetch의 기본값은 캐싱x이다.
  const allBooks: BookData[] = await res.json();

  if (!res.ok) return <div>오류가 발생했습니다...</div>;
  return (
    <>
      {allBooks.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </>
  );
};

const RecommendBooks = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/random`,
      // { cache: "force-cache" } // cache: "force-cache" 옵션: 캐싱o
      { next: { revalidate: 3 } } // next: { revalidate: 3 } 옵션: 캐싱o, n초마다 캐시 업데이트(PageRouter의 ISR과 유사함)
      // 데이터 캐시 과정에 revalidate 옵션을 사용할 경우 해당 주기 마다 풀 라우트 캐시 전체가 업데이트 된다!
    );
    const recommendBooks: BookData[] = await res.json();

    if (!res.ok) return <div>오류가 발생했습니다...</div>;
    return (
      <>
        {recommendBooks.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </>
    );
  } catch (error) {
    console.error(error);
    return <div>ERROR</div>
  }
};

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        <Suspense fallback={<BookListSkeleton count={3} />}>
          {/* React의 Suspense 컴포넌트를 이용하면 병렬로 완료되는 순서대로 화면에 렌더링되도록 할 수 있다. */}
          <RecommendBooks />
        </Suspense>
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        <Suspense fallback={<BookListSkeleton count={10} />}>
          <AllBooks />
        </Suspense>
      </section>
    </div>
  );
}
