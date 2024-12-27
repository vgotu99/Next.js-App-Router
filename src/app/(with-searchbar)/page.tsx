import BookItem from "@/components/book-item";
import style from "./page.module.css";
import { BookData } from "@/types";

const AllBooks = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`);
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
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/random`
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
