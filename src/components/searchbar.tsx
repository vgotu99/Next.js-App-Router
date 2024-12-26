"use client"

import { useRouter } from "next/navigation"; // 페이지 라우터와 달리 앱 라우터 방식의 Next.js 앱에서는 "next/navigation" 으로부터 useRouter를 불러와야한다.
import { useState } from "react";

const Searchbar = () => {
  const [search, setSearch] = useState("");
  const router = useRouter()

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onSubmit = () => {
    router.push(`/search?q=${search}`)
  }

  return (
    <div>
      <input value={search} onChange={onChangeSearch} type="text" />
      <button onClick={onSubmit}>검색</button>
    </div>
  );
};

export default Searchbar;
