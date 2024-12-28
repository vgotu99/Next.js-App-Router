import { notFound } from "next/navigation";
import style from "./page.module.css";
import { createReviewAction } from "@/actions/create-review.action";
// export const dynamicParams = false; // generateStaticParams에 명시해주지 않은 경로로의 요청은 모두 404 상태를 띄워주는 라우트 세그먼트 옵션

export const generateStaticParams = () => {
  return [{ id: "1" }, { id: "2" }, { id: "3" }];
}; // PageRouter의 getStaticPaths와 같이 존재할 수 있는 동적 파라미터의 값을 반환하주면 된다.
// 문자열로 명시해줘야만 한다!
// 리턴된 값으로 된 경로는 무조건 스태틱 페이지가 된다.

const BookDetail = async ({ id }: { id: string }) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${id}`
  );
  const specificBook = await res.json();
  const { title, subTitle, description, author, publisher, coverImgUrl } =
    specificBook;

  if (!res.ok) {
    if (res.status === 404) {
      notFound();
    }

    return <div>오류가 발생했습니다...</div>;
  }
  return (
    <section>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${coverImgUrl}')` }}
      >
        <img src={coverImgUrl} />
      </div>
      <div className={style.title}>{title}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.author}>
        {author} | {publisher}
      </div>
      <div className={style.description}>{description}</div>
    </section>
  );
};

const ReviewEditor = ({ bookId }: { bookId: string }) => {
  return (
    <section>
      <form action={createReviewAction}>
        <input name="bookId" value={bookId} hidden readOnly />
        <input
          required
          type="text"
          name="author"
          placeholder="작성자 이름을 입력해주세요."
        />
        <input
          required
          type="text"
          name="content"
          placeholder="리뷰 내용을 입력해주세요."
        />
        <button type="submit">작성하기</button>
      </form>
    </section>
  );
};

export default function Page({ params }: { params: { id: string } }) {
  return (
    <div className={style.container}>
      <BookDetail id={params.id} />
      <ReviewEditor bookId={params.id} />
    </div>
  );
}
