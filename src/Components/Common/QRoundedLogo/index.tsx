export interface QLogoProps {
    logoUrl: string;
    className?: string;
    alt: string;
}
const QRoundedLogo: React.FC<QLogoProps> = ({
    logoUrl,
    className = "",
    alt,
}) => {
    return (
        <img
            className={`object-contain rounded-full ${className}`}
            src={logoUrl}
            alt={alt}
        />
    );
};

export default QRoundedLogo;
