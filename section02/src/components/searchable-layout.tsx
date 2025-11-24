import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";
import style from "./searchable-layout.module.css";

export default function SearchableLayout({
    children,
}: {
    children: ReactNode;
}) {
    const router = useRouter();
    const [search, setSearch] = useState("");

    const q = router.query.q as string;

    useEffect(() => {
        setSearch(q || "");  // 새로고침해도 검색어 입력 유지
    }, [q]);

    const onChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    }

    const onSubmit = () => {
        if (!search || q === search) return; // 예외처리, 쿼리스트링 값이 서치값과 같으면 페이지 이동 안함
        router.push(`/search?q=${search}`)
    };

    const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => { // 리액트의 키보드 이밴트 어디서? HTMLInputElement안에서!
        if (event.key === 'Enter') {
            onSubmit();
        }
    };

    return (
        <div>
            <div className={style.searchbar_container}>
                <input
                    value={search}
                    onKeyDown={onKeyDown}
                    onChange={onChangeSearch} 
                    placeholder="검색어를 입력하세요 ..."/>
                <button onClick={onSubmit}>검색</button>
            </div>
            {children}
        </div>
    );
};