import Logo from "../../assets/logo.svg";
import "./Lclpdf.scss";
import { Button } from "rsuite";
import { IoArrowBack } from "react-icons/io5";
import Table from "./Table";
import Secondtable from "./Secondtable/Secondtable";
import { useParams } from "react-router-dom";
import { useRequestList } from "../../Hooks/useRequestList";

const Lclpdf = () => {
  const { id } = useParams();
  const { data } = useRequestList();
  if (!id) return null;

  const quoteData = (data || []).filter((m) => m.id == parseInt(id));
  console.log(quoteData);
  return (
    <>
      {" "}
      <div className="lclpdf">
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
              <img src={Logo} alt="..." />
            </div>
          </div>
          <div className="company-email">
            <h6>E-MAIL</h6>
            <span>commercial@amiinu.com</span>
          </div>
          <div className="company-address">
            <div className="quote-id">
              <h6>QUOTATION ID</h6>
              <span>QUO-00125284</span>
            </div>
            <div className="quote-id">
              <h6>YOUR CONTACT</h6>
              <span>Support</span>
            </div>
            <div className="quote-id">
              <h6>DATE</h6>
              <span>01 April 2024</span>
            </div>
          </div>
          <div className="details-section">
            <a>Details Of the Request</a>
            <div className="details-middle">
              <div className="middle-left">
                <h6>RequestJOURNEY</h6>
                <h6>VIA</h6>
                <h6>CARGO READY DATE </h6>
                <h6>CARGO READY DATE </h6>
                <h6>TRANSPORT MODE :</h6>
                <h6>SERVICE LEVEL :</h6>
                <h6>standardCOMMODITY: </h6>
                <h6>VALID FROM :</h6>
                <h6>2024INCOTERM</h6>
              </div>
              <div className="middle-left">
                <h6 className="data">Shenzhen, Guangdong (CNSZP)</h6>
                <h6 className="data">Shenzhen, Guangdong (CNSZP)(CNSZP) CFS</h6>
                <h6 className="data">22 April 2024</h6>
                <h6 className="data">LCLSERVICE</h6>
                <h6 className="data">standard</h6>
                <h6 className="data">MVbushing, MVbushing</h6>
                <h6 className="data">01 Apr 2024 to 30 Apr 2024</h6>
                <h6 className="data">DDP</h6>
              </div>
              <div className="middle-left">
                <h6 className="data">TO Santos, Sao Paulo (BRSSZ)</h6>
                <h6 className="data">Santos, Sao Paulo (BRSSZ)(BRSSZ) CFS</h6>
                <h6></h6>
              </div>
            </div>
            <div className="booking-confirmation">
              <h6>
                Bookings must be made within 29 days from the quotation date for
                the quotation to remain valid
              </h6>
            </div>
            <div className="first-table">
              <Table />
            </div>

            <div className="second-table">
              <Secondtable />
            </div>
            <div className="sign-div">
              <p>
                VGM Admin fee do not include physical weighing, for more details
                see Pyramid Lines Singapore T&C.{" "}
              </p>
              <p>
                REMARKS: We do not accept DDP conditions in Brazil, subject
                quote apply on DAP terms only subj to all local taxes, ad
                valoren based on cargo invoice value
              </p>
              <div className="best-regard">
                <span className="best-regard">Best regards</span> <br />
                <span>AMINU</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Lclpdf;
