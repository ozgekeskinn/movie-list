export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}) {
  if (totalPages <= 1) {
    return null;
  }

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  return (
    <nav
      className="pagination"
      aria-label="Sayfa navigasyonu"
    >
      <button
        type="button"
        disabled={isFirstPage}
        onClick={() => onPageChange(currentPage - 1)}
      >
        ← Önceki
      </button>

      <span className="pagination-info">
        Sayfa {currentPage} / {totalPages}
      </span>

      <button
        type="button"
        disabled={isLastPage}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Sonraki →
      </button>
    </nav>
  );
}