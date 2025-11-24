"use client"

import { createReviewAction } from "@/actions/create-review.actions";
import style from "./review-editor.module.css";
import { useActionState, useEffect } from "react";

export default function ReviewEditor({ bookId }: { bookId: string }) {
    const [state, formAction, isPendig] = useActionState(createReviewAction, null);

    useEffect(() => {
        if(state && !state.status){
            alert(state.error);
        }
    })

    return (
        <section>
            <form
                className={style.form_container}
                action={formAction}
            >
                <input name="bookId" value={bookId} hidden readOnly />
                {/* hidden input tag에는 readOnlt attribute를 작성해줘야 한다 */}
                <textarea disabled={isPendig} required name="content" placeholder="리뷰 내용" />
                <div className={style.submit_container}>
                    <input disabled={isPendig} required name="author" placeholder="작성자" />
                    <button disabled={isPendig} type="submit">
                        {isPendig ? "..." : "작성히기"}
                    </button>
                </div>
            </form>
        </section>
    )
}