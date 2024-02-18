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
            <div className="py-2 bg-primary-green rounded-t-lg">{header}</div>
            <div className="p-3  border-t h-80 overflow-scroll">{children}</div>
        </div>
    );
};

export default QContentBox;
