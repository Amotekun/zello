interface ListWrapperProps {
    children: React.ReactNode;
    className?: string;
};

export const ListWrapper: React.FC<ListWrapperProps> = ({
    children,
    className
}) => {
    return (
        <li className={`${className} shrink-0 z-10 h-full w-[272px] select-none`}>
            {children}
        </li>
    )
}