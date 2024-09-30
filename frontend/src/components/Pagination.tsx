
interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
    const pages = [...Array(totalPages).keys()].map((num) => num + 1);

    return (
        <div className="pagination">
            {currentPage > 1 && (
                <button onClick={() => onPageChange(currentPage - 1)} className="mr-2">
                    &lt;
                </button>
            )}

            {pages.map((page) => (
                <button key={page} onClick={() => onPageChange(page)} className={`btn ${currentPage === page ? "active" : ""} another-classname`}
                    style={{ margin: "0 8px", textDecoration: currentPage === page ? "underline" : "none" }}
                    onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
                    onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}>
                        {page}
                </button>
            ))}

            {currentPage < totalPages && (
                <button onClick={() => onPageChange(currentPage + 1)} className="ml-2">
                    &gt;
                </button>
            )}
        </div>
    );
};

export default Pagination;