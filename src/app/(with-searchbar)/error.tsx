"use client";
import { useRouter } from "next/navigation";
import { startTransition, useEffect } from "react";

// 서버, 클라이언트에서 발생하는 모든 에러에 대응할 수 있도록 클라이언트 컴포넌트로 지정해준다.

// error 컴포넌트는 같은, 하위 경로에 존재하는 컴포넌트에서 에러가 발생 시 렌더링 되는 컴포넌트이다.
const Error = ({
  error /* error라는 이름의 props는 현재 발생한 에러 정보이다. */,
  reset /* 에러 상태를 초기화하고 에러가 발생한 컴포넌트를 다시 한번 렌더링시켜보는 기능을 가진 함수이다.
  다만 서버에게 데이터를 재요청하지는 않고 받았던 데이터를 가지고 클라이언트에서 렌더링을 재시도하기만 한다.
  👆 결론: 클라이언트 사이드(클라이언트 컴포넌트)에서 발생한 오류만 복구할 수 있다.
  👇 서버 사이드 error였을 때 다시 시도하는 방법!
    - window.location.reload(): 브라우저 자체를 리로드
    - router.refresh() + reset(): 서버 컴포넌트만 재요청하여 렌더링 + 리셋 함수
   */,
}: {
  error: Error;
  reset: () => void;
}) => {
  const router = useRouter();

  useEffect(() => {
    console.error(error.message);
  }, [error]);

  const handleReset = () => {
    startTransition(() => {
      // 전달받은 콜백함수에서 UI를 변경시키는 작업들을 모두 일괄적으로 처리하도록 하는 React의 method이다.
      // router.refresh()가 비동기적으로 동작하고 reset()은 동기적으로 동작하는데 router.refresh()가 먼저 실행된 이후 reset()이 실행되어야하기에 startTransition method를 사용함
      router.refresh(); // 현재 페이지에 필요한 서버 컴포넌트들을 다시 요청하여 리렌더링, 비동기적으로 동작한다.
      reset();
    });
  };

  return (
    <div>
      <h3>오류가 발생했습니다.</h3>
      <button onClick={handleReset}>다시 시도</button>
    </div>
  );
};

export default Error;
