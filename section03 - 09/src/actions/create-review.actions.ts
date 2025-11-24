"use server";

import { error } from "console";
import { revalidatePath, revalidateTag, updateTag } from "next/cache";

// 서버 action 함수를 분리해놨을 땐 이렇게 최상단에 지시자를 쓰면 된다.

export async function createReviewAction(state: string, formData: FormData) {
    const bookId = formData.get("bookId")?.toString();
    const content = formData.get("content")?.toString(); // 값이 있다면 string 값으로 바꾼다.
    const author = formData.get("author")?.toString();

    console.log(bookId, content, author);

    if (!bookId || !content || !author) {
        return {
            status: false,
            error: "리뷰 내용과 작성자를 입력해주세요"
        }
    }

    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review`,
            {
                method: "POST",
                body: JSON.stringify({ bookId, content, author }),
            }
        );
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        // revalidatePath(`/book/${bookId}`) // 이 경로에 있는 캐시 데이터 모두 제거하고 해당 경로의 페이지를 바로 생성한다.
        updateTag(`review-${bookId}`);
        return {
            status: true,
            error: "",
        }
    } catch (err) {
        return {
            status: false,
            error: `리뷰 저장에 실패했습니다 ${err}`
        }
    }
}