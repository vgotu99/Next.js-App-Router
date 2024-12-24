const Page = async (
  // props //앱라우터에서는 쿼리파라미터, 경로파라미터의 값이 props를 통해 Promise 객체 형태로 전달된다. 이는 searchParams, params를 가지고 있으니 필요한 값을 구조분해 할당으로 가져옴!
  // searchParams: 쿼리 파라미터
  // params: 동적 경로 파라미터
  { searchParams }: { searchParams: Promise<{ q: string }> }
) => {
  const { q } = await searchParams;

  return <div>SearchQuery: {q}</div>;
};

export default Page;
