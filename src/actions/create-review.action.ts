"use server";

export const createReviewAction = async (
  formData: FormData /* form 태그의 action으로 createReviewAction함수를 호출했기에 formData라는 데이터가 매개변수로 전달됨 */ 
) => {
  const bookId = formData.get("bookId")?.toString()
  const content = formData.get("content")?.toString(); // .toString method를 이용해서 string 타입으로 변환해주는 이유는 기본적으로 string 혹은 file 타입을 의미하는 FormDataEntryValue라는 타입으로 추론되기 때문에 명시적으로 string으로 정의되기 위함이다.
  const author = formData.get("author")?.toString();

  if (!bookId || !content || !author) return;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review`,
      {
        method: "POST", // POST method로 요청이 서버에게 전송되도록 함
        body: JSON.stringify({
          // 네트워크 요청으로 단순한 객체를 보낼 수 없으니 JSON.stringify를 이용해서 문자열과 같은 단순한 형태로 직렬화 함
          bookId,
          content,
          author,
        }),
      }
    );
    console.log(res.status);
  } catch (error) {
    console.error(error);

    return;
  }
};
