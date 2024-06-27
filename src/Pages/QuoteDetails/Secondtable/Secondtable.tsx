import "../Lclpdf.scss";

const Secondtable = () => {
    // const data = [
    //     { id: 1, quantity: "Mark", weight: "Otto", length: "@mdo", width: "@mdo", height: "@mdo", volume: "@mdo" },
    //     { id: 2, quantity: "Jacob", weight: "Thornton", length: "@fat", width: "@fat", height: "@fat", volume: "@fat" },
    //     { id: 3, quantity: "Larry the Bird", weight: "@twitter", length: "@fat", width: "@fat", height: "@fat", volume: "@fat" },
    //   ];
  return (
    <>
       <table className="table tablesecond table-bordered">
      <thead className="Thead">
        <tr>
          <th scope="col" colSpan={1}>POL</th>
          <th scope="col" colSpan={10}>Shenzhen, Guangdong (CNSZP)(CNSZP) CFS</th>       
          <th scope="col" colSpan={2}></th>
        </tr>
        <tr>
          <th scope="col" colSpan={1}>POD</th>
          <th scope="col" colSpan={10}>Santos, Sao Paulo (BRSSZ)(BRSSZ) CFS</th>
          <th scope="col" colSpan={2} className="no-border">Santos, Sao Paulo (BRSSZ) - DOOR</th>
        </tr>
        <tr>
          <th scope="col" colSpan={1}>TO</th>
          <th scope="col" colSpan={10}>Shenzhen, Guangdong (CNSZP)(CNSZP) CFS</th>
       
          <th scope="col" colSpan={2}></th>
        </tr>
      </thead>
      <tbody>
       
          <tr>
            <th scope="row" colSpan={12}>Origin Handling & Processing</th>
              <td colSpan={1}>60 USD</td>
          </tr>
          <tr>
            <th scope="row" colSpan={12}>Origin Handling & Processing</th>
              <td colSpan={1}>60 USD</td>
          </tr>
          <tr>
            <th scope="row" colSpan={12} className="text-center">Freight Charges</th>
              <td colSpan={1}>60 USD</td>
          </tr>
          <tr>
            <th scope="row" colSpan={12}>Origin Handling & Processing</th>
              <td colSpan={1}>60 USD</td>
          </tr>
          <tr>
            <th scope="row" colSpan={12}>Origin Handling & Processing</th>
              <td colSpan={1}>60 USD</td>
          </tr>
          <tr>
            <th scope="row" colSpan={12}>Origin Handling & Processing</th>
              <td colSpan={1}>60 USD</td>
          </tr>
          <tr>
            <th scope="row" colSpan={12} className="text-center">Freight Charges</th>
              <td colSpan={1}>60 USD</td>
          </tr>
          <tr>
            <th scope="row" colSpan={12}>Origin Handling & Processing</th>
              <td colSpan={1}>60 USD</td>
          </tr>
          <tr className="lastrow">
            <th scope="row" colSpan={12} className="text-center">Total</th>
              <td colSpan={1} className="text-center">65660 USD</td>
          </tr>
      
      </tbody>
    </table>
    
    </>
  )
}

export default Secondtable;