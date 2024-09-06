"use client";


import { ListForm } from "./list-form";
import { useParams } from "next/navigation";
import { ListItem } from "./list-item";
import { useRetrieveListQuery } from "@/redux/features/auth-api-slice";
import { useEffect, useState } from "react";

export const ListContainer = () => {
    const {workspaceSlug, boardSlug} = useParams()

    const {data: list, error} = useRetrieveListQuery({
        workspaceSlug, 
        boardSlug
    });

    console.log("LIST DATA WITH CARDS CONTAINER:", list)

    const [listData, setListData] = useState(list);

    useEffect(() => {
        if (list) {
            console.log("LIST DATA:", list)
            setListData(list)
        }

    }, [list])

    console.log("LIST BOARD DATA:", listData)

    return (
        <div className="w-full h-full overflow-x-auto">        
            <ol className="flex gap-x-12 h-full overflow-x-auto px-4 py-4 scrollbar-hide">
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
        </div>
    )
}