import ClientComponent from "@/components/client-component";
import styles from "./page.module.css";
import ServerComponent from "@/components/server-component";

export default function Home() {
  return (
    <div className={styles.page}>
      <div>index page</div>
      <ClientComponent>
        <ServerComponent />
        {/*
          서버 컴포넌트를 클라이언트 컴포넌트에 호출해서 사용하는 방식!
          클라이언트 컴포넌트에서 서버 컴포넌트를 직접 import해서 사용하면 서버 컴포넌트가 클라이언트 컴포넌트로 자동 변환되기 때문에 JS 번들에 포함될 수 밖에 없다. 따라서 이런 형태로 클라이언트 컴포넌트의 children props로 서버 컴포넌트의 반환값만을 받아서 사용해야한다.
        */}
      </ClientComponent>
    </div>
  );
}
