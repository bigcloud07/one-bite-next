import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        await res.revalidate("/"); // 어떤 페이지를 revalidate 하는지
        return res.json({ revalidate: true }); // 성공했을 때, json으로 넘겨줌
    } catch (err) {
        res.status(500).send("Revalidation Failed");
    }
}