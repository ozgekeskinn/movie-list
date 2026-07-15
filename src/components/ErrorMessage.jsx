export default function ErrorMessage({ message }) {
    return (
        <div className="error-box">
            <h2>Bir hata olıuştu</h2>
            <p>{message}</p>
        </div>
    );
}