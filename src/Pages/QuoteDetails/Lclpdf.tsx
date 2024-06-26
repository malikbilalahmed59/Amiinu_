
import "./Lclpdf.scss";
import { Button } from "rsuite";
import { IoArrowBack } from "react-icons/io5";
const Lclpdf = () => {
  return (
    <> <div className="lclpdf">
    <div className="details-header">
      <div className="leftside-top">
        <IoArrowBack size={25} color="white" />
        <span className="Quotation">Quotation QUO-00143716</span>
        <Button className="status">Expired</Button>
      </div>
      <div className="rightside-top">
        <Button className="rightpdf">QUO-00143716</Button>
      </div>
    </div>

    <div className="container pdf-container">
    <div className="comapmy-name">
        <div className="left-side">
            <h6>COMPANY NAME</h6>
            <span>Amiinu</span>
        </div>
        <div className="left-side">
         <img src="" alt="..." />
        </div>
    </div>
    <div className="company-email">
        <h6>E-MAIL</h6>
        <span>commercial@amiinu.com</span>
    </div>
    </div>
  </div></>
  )
}

export default Lclpdf;