export default function Loading({ message = "Yükleniyor..." }) {
    return (
        <div className="loading-message">
            <div className="loading-spinner"></div>
            <p>{message}</p>
        </div>
    );
}