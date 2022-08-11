import React from 'react'
import {faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


export const Pagination = ({ activePage, count, rowsPerPage, totalPages, setActivePage }) => {
    const beginning = activePage === 1 ? 1 : rowsPerPage * (activePage - 1) + 1
    const end = activePage === totalPages ? count : beginning + rowsPerPage - 1

    return (
        <>
            <div className="pagination">
                <span>Page {activePage} of {totalPages}</span>
                <button className = "sort-button" disabled={activePage === 1} onClick={() => setActivePage(activePage - 1)}><FontAwesomeIcon icon={ faCaretLeft }/></button>
                <button className = "sort-button" disabled={activePage === totalPages} onClick={() => setActivePage(activePage + 1)}><FontAwesomeIcon icon={ faCaretRight }/></button>
            </div>
            <p>
                Rows: {beginning === end ? end : `${beginning} - ${end}`} of {count}
            </p>
        </>
    )
}
