const TableInfo = ({ projects, currentPage, totalPages, setCurrentPage }) => {
    return (
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>S.No.</th>
              <th>Percentage Funded</th>
              <th>Amount Pledged</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project, index) => (
              <tr key={index}>
                <td>{project["s.no"]}</td>
                <td>{project["percentage.funded"]}%</td>
                <td>{project["amt.pledged"].toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    );
  };

  export default TableInfo;