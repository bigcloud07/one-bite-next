import { BookData } from "@/types";

export default async function fetchOneBook(id: number): Promise<BookData | null> {
    const url = `http://localhost:12345/book/${id}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error();
        }

        return response.json();
    }

    catch (err) {
        console.error(err);
        return null; // 책 한권만 반환하니까 에러뜨면 null 값을 반환 해야함!
    }
}