import { Sidebar } from "../_components/sidebar";

export default function WorkspaceLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <main className="pt-16 w-full">
            <div className="flex gap-x-0 ">
                <div className="w-64 p-3 shrink-0 bg-slate-50 hidden md:block">
                    <Sidebar />
                </div>
                {children}
            </div>
        </main>
    )
}