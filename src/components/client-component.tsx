"use client"

import { ReactNode } from "react";

const ClientComponent = (
  {children}: {children: ReactNode} // 클라이언트 컴포넌트에서 import ServerComponent from './server-component'와 같이 서버 컴포넌트를 직접 import해서 return문 안에 서버 컴포넌트를 렌더링하게되면 해당 서버 컴포넌트는 클라이언트 컴포넌트로 자동 변환된다.
  // 따라서 JS 번들에 포함되어 하이드레이션 될 필요가 없는 서버 컴포넌트는 children props로 서버 컴포넌트의 반환값을 받아서 사용해야한다.
  // 그러면 클라이언트 컴포넌트에서 사용된 서버 컴포넌트는 클라이언트 컴포넌트로 변환되지 않고 서버 컴포넌트를 유지한다.

) => {

  console.log('클라이언트 컴포넌트 입니다');
  return (
    <div>{children}</div>
  )
}

export default ClientComponent