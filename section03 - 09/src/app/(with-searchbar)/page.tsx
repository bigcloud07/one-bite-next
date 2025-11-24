import BookItem from "@/components/book-item";
import style from "./page.module.css";
import { BookData } from "@/types";
import { delay } from "@/util/delay";
import { Suspense } from "react";
import BookItemSkeleton from "@/components/skeleton/book-item-skeleton";
import BookListSkeleton from "@/components/skeleton/book-list-skeleton";

// export const dynamic = 'force-static';
// 페이지의 유형을 강제로 스태틱, 다이나믹으로 설정
// 1. auto
// 2. force-dynamic
// 3. force-static
// 4. error - static으로 설정을 하긴 하지만 동적 함수를 사용하는 페이지에서는 빌드 오류가 나게 한다.

async function AllBooks() {
  await delay(1400);
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`,
    { cache: "no-store" }
  );
  if (!response.ok) {
    return <div>오류가 발생했습니다...</div>
  }
  const allbooks: BookData[] = await response.json();

  return (
    <div>
      {allbooks.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
};

async function RecoBooks() {
  await delay(1400);
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/random`,
    { cache: "no-store" }
  );
  if (!response.ok) {
    return <div>오류가 발생했습니다...</div>
  }
  const recobooks: BookData[] = await response.json();

  return (
    <div>
      {recobooks.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  )
}

export const dynamic = "force-dynamic";

export default async function Home() {

  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        <Suspense fallback={<BookListSkeleton count={3}/>}>
          <AllBooks />
        </Suspense>
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        <Suspense fallback={<BookListSkeleton count={10}/>}>
          <RecoBooks />
        </Suspense>
      </section>
    </div>
  );
}
