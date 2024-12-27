import "./globals.css";
import Link from "next/link";
import style from "./layout.module.css";

const Footer = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`, {
    cache: "force-cache",
  });

  const books = await res.json();
  const bookCount = books.length;

  if (!res.ok) return <footer>제작 @vgotu99</footer>;

  return (
    <footer>
      <div>제작 @vgotu99</div>
      <div>{bookCount}개의 도서가 등록되어있습니다.</div>
    </footer>
  );
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <div className={style.container}>
          <header>
            <Link href={"/"}>📚 ONEBITE BOOKS</Link>
          </header>
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
