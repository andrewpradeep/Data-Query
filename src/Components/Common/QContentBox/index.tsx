export interface QContentBoxProps {
    header: React.ReactNode;
    children: React.ReactNode;
    className?: string;
}
const QContentBox: React.FC<QContentBoxProps> = ({
    header,
    children,
    className = "",
}) => {
    return (
        <div className={`border rounded-lg bg-white ${className}`}>
            <div className="rounded-t-lg py-2">{header}</div>
            <div className=" border-t h-80 overflow-scroll">{children}</div>
        </div>
    );
};

export default QContentBox;
