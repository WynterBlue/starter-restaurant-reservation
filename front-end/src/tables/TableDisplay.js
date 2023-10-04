import React from "react";

function TableDisplay({table}){
    const {table_id, table_name, reservation_id} = table
    return (
        <div>
            <p>{table_name}</p>
            {reservation_id ? (
                <p data-table-id-status={table_id}>Occupied</p>
            ) : (
                <p data-table-id-status={table_id}>Free</p>
            )}
        </div>
    )
}

export default TableDisplay