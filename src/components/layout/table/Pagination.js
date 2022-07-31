import React from 'react'
import KeyboardDoubleArrowLeftSharpIcon from '@mui/icons-material/KeyboardDoubleArrowLeftSharp';
import KeyboardDoubleArrowRightSharpIcon from '@mui/icons-material/KeyboardDoubleArrowRightSharp';


export const Pagination = ({ activePage, count, rowsPerPage, totalPages, setActivePage }) => {
    const beginning = activePage === 1 ? 1 : rowsPerPage * (activePage - 1) + 1
    const end = activePage === totalPages ? count : beginning + rowsPerPage - 1

    return (
        <>
            <div className="pagination">
                <KeyboardDoubleArrowLeftSharpIcon disabled={activePage === 1} onClick={() => setActivePage(1)}> </KeyboardDoubleArrowLeftSharpIcon>
                <button disabled={activePage === 1} onClick={() => setActivePage(activePage - 1)}> ⬅ </button>
                <button disabled={activePage === totalPages} onClick={() => setActivePage(activePage + 1)}> ➡ </button>
                <KeyboardDoubleArrowRightSharpIcon disabled={activePage === totalPages} onClick={() => setActivePage(totalPages)}> ⏭ </KeyboardDoubleArrowRightSharpIcon>
            </div>
            <p>
                Page {activePage} of {totalPages}
            </p>
            <p>
                Rows: {beginning === end ? end : `${beginning} - ${end}`} of {count}
            </p>
        </>
    )
}
