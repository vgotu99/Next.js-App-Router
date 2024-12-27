import BookItem from "@/components/book-item";
import { BookData } from "@/types";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
  }>;
}) {
  const { q } = await searchParams;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/search?q=${q}`
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
}
