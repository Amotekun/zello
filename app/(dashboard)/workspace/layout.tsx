import { Sidebar } from "../_components/sidebar";

export default function WorkspaceLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <main className="relative pt-16 w-full">
            <div className="flex flex-row w-full gap-x-0">
              {/*   <div className="w-64 hidden p-3 shrink-0 bg-slate-50 md:block">
                    <Sidebar />
                </div> */}
                {children}
            </div>
        </main>
    );
};

{/* flex-1 relativce */}