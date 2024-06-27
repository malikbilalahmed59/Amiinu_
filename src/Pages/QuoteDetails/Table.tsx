import "./Lclpdf.scss";

const data = [
  { id: 1, quantity: "Mark", weight: "Otto", length: "@mdo", width: "@mdo", height: "@mdo", volume: "@mdo" },
  { id: 2, quantity: "Jacob", weight: "Thornton", length: "@fat", width: "@fat", height: "@fat", volume: "@fat" },
  { id: 3, quantity: "Larry the Bird", weight: "@twitter", length: "@fat", width: "@fat", height: "@fat", volume: "@fat" },
];

const Table = () => {
  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th scope="col"></th>
          <th scope="col">Quantity</th>
          <th scope="col">Weight per unit (kg)</th>
          <th scope="col">Length (cm)</th>
          <th scope="col">Width (cm)</th>
          <th scope="col">Height (cm)</th>
          <th scope="col">Volume (cbm)</th>
        </tr>
      </thead>
      <tbody>
        {data.map(row => (
          <tr key={row.id}>
            <th scope="row">{row.id}</th>
            <td>{row.quantity}</td>
            <td>{row.weight}</td>
            <td>{row.length}</td>
            <td>{row.width}</td>
            <td>{row.height}</td>
            <td>{row.volume}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
