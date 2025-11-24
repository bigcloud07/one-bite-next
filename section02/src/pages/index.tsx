import SearchableLayout from "../components/searchable-layout";
import style from "./index.module.css";
import { ReactNode, useEffect } from "react";
import BookItem from "@/components/book-item";
import { InferGetStaticPropsType } from "next";
import fetchBooks from "@/lib/fetch-books";
import fetchRandomBooks from "@/lib/fetch-randombooks";
import Head from "next/head";

export const getStaticProps = async () => {

  console.log("인덱스 페이지");

  // 컴포넌트보다 먼저 실행되어서, 컴포넌트에 필요한 데이터를 불러오는 함수
  // const allBooks = await fetchBooks();
  // const recoBooks = await fetchRandomBooks();

  // getStaticProp ssg도 문법은 ssr과 동일함

  // 병렬로 불러오는 방법으로 upgrade
  const [allBooks, recoBooks] = await Promise.all([ // 여러개의 promise 객체를 처리할 때 쓰는 메서드
    fetchBooks(),
    fetchRandomBooks(),
  ]);

  return {
    props: { // 프레임 워크 속 문법이다
      allBooks,
      recoBooks,
    },
    revalidate: 3,
  };
}

export default function Home({ allBooks, recoBooks }: InferGetStaticPropsType<typeof getStaticProps>) {
  // window.location; 서버에서 한번 실행되는데 window는 브라우져 객체를 의미하므로 undefined가 된다.

  useEffect(() => {
    console.log(window); // 실행하려면 이렇게 해야함 useEffect는 컴포넌트가 마운트 될 때 보여주기 때문
  }, []);



  return (
    <>
      <Head>
        <title>한입북스</title>
        <meta property="og:image" content="/thumbnail.png"/>
        <meta property="og:title" content="한입북스"/>
        <meta 
          property="og:description"
          content="한입 북스에 등록된 도서들을 만나보세요"
        />
      </Head>
      <div className={style.container}>
        <section>
          <h3>지금 추천하는 도서</h3>
          {recoBooks.map((book) => <BookItem key={book.id} {...book} />)}
        </section>
        <section>
          <h3>등록된 모든 도서</h3>
          {allBooks.map((book) => <BookItem key={book.id} {...book} />)}
        </section>
      </div>
    </>
  )
}

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>
}

// Js에서 함수는 모두 객체라서 메서드를 만들 수 있다.