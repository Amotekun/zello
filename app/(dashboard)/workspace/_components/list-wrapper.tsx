interface ListWrapperProps {
    children: React.ReactNode;
};

export const ListWrapper: React.FC<ListWrapperProps> = ({children}) => {
    return (
        <li className="shrink-0 z-10 h-full w-[272px] select-none">
            {children}
        </li>
    )
}