import BookItem from "@/components/book-item";
import style from "./page.module.css";
import { BookData } from "@/types";

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
};

export default async function Home() {
  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        <RecommendBooks />
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        <AllBooks />
      </section>
    </div>
  );
}
