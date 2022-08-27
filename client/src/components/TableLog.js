import React from "react";
import "../css/TableLog.css";
import { MdDelete } from "react-icons/md";

const Table = (props) => {
  const { data, onDelete } = props;
  return (
    <div className="container">
      <table>
        <thead>
          <tr>
            <th>Food</th>
            <th>Weight</th>
            <th>Quantity</th>
            <th>Calories</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data !== null && data ? (
            data.foodLog.map((row, ndx) => {
              return (
                <tr key={ndx}>
                  <td>{row.name}</td>
                  <td>{row.weight}</td>
                  <td>{row.quantity}</td>
                  <td>{row.calories}</td>
                  <td>
                    <MdDelete
                      onClick={() => {
                        onDelete(data._id, ndx);
                      }}
                      className="btn--action"
                      size={"1.3rem"}
                    />
                  </td>
                </tr>
              );
            })
          ) : (
            <tr></tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
