import { BoardNavbar } from "../../_components/board-navbar";
import { BackgroundImage } from "../../_components/background-image";
import { ListContainer } from "../../_components/list-container";

export default function BoardPage({
    params,
}: {
    children: React.ReactNode;
    params: {workspaceSlug: string, boardSlug: string};
}) {   
    return (
       <BackgroundImage params={params}>
            <BoardNavbar params={params} />

            <div className="absolute inset-0 bg-black/10" />
            <main className="relative pt-28 h-full">
                <ListContainer />
            </main>
        </BackgroundImage>
    );
};