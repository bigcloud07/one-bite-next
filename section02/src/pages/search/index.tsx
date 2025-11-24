import BookItem from "@/components/book-item";
import SearchableLayout from "@/components/searchable-layout";
import fetchBooks from "@/lib/fetch-books";
import { BookData } from "@/types";
import { GetServerSidePropsContext, GetStaticPropsContext, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";
import Head from "next/head";

// export const getStaticProps = async (context: GetStaticPropsContext) => {

//     const q = context.query.q; // 빌드 타임엔 쿼리 스트링을 알 수 없다.
//     // 사전 렌더링 상황에서는 쿼리 스트링 값을 불러올 수 없다.

//     const books = await fetchBooks(q as string);

//     return {
//         props: { books },
//     }
// }

export default function Page() {
    const [books, setBooks] = useState<BookData[]>([]);

    const router = useRouter();
    const q = router.query.q;
    const fetchSearchResult = async () => {
        const data = await fetchBooks(q as string);
        setBooks(data);
    }

    useEffect(() => {
        if (q) {
            fetchSearchResult();
        }
    }, [q]);
    return (
        <>
            <Head>
                <title>한입북스 - 검색결과</title>
                <meta property="og:image" content="/thumbnail.png" />
                <meta property="og:title" content="한입북스 검색결과" />
                <meta
                    property="og:description"
                    content="한입 북스에 등록된 도서들을 만나보세요"
                />
            </Head>
            <div>
                {books.map((book) => (
                    <BookItem key={book.id} {...book} />
                ))}
            </div>
        </>
    );
}

Page.getLayout = (page: ReactNode) => {
    return <SearchableLayout>{page}</SearchableLayout>
}

//app.tsx에서 넘길 때, Page 컴포넌트의 메서드까지 같이 넘긴다!