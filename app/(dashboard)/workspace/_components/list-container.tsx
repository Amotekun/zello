"use client";


import { ListForm } from "./list-form";
import { useParams } from "next/navigation";
import { ListItem } from "./list-item";
import { useRetrieveListQuery } from "@/redux/features/auth-api-slice";
import { useEffect, useState } from "react";

export const ListContainer = () => {
    const params = useParams()
    const {workspaceSlug, boardSlug} = params

    const {data: list, error} = useRetrieveListQuery({
        workspaceSlug, 
        boardSlug
    });

    const [listData, setListData] = useState(list);

    useEffect(() => {
        if (list) {
            console.log("LIST DATA:", list)
            setListData(list)
        }

    }, [list])

    console.log("LIST BOARD DATA:", listData)

    return (
        <ol
            className="flex gap-x-3 h-full"
        >
            {listData && listData.map((list, index) => {
                return (
                    <ListItem 
                        key={list.id}
                        index={index}
                        list={list}

                    />
                )
            })}
            <ListForm />
        </ol>
    )
}