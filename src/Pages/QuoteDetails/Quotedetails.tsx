import "./Quotedetails.scss";
import { Button } from "rsuite";
import { IoArrowBack } from "react-icons/io5";

const Quotedetails = () => {
  return (
    <>
      <div className="Quotedetails">
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
          <div className="pdf-header">
            <div className="pdfHeader-left">
              <span className="air">Air Freight quote</span>
            </div>
            <div className="pdfHeader-right">
              <span className="page">Page 1 of 1</span>
            </div>
          </div>
          <div className="comapny-address">
            <div className="leftside">
              <h6 className="company-name">Company Name</h6>
              <h6 className="company-name">Company Address</h6>
            </div>
            <div className="rightside">
              <h6 className="aminue-details">AmiinuShipment</h6>
              <h6 className="aminue-details">2-16 Fa Yuen Street</h6>
              <h6 className="aminue-details">Mong Kok</h6>
              <h6 className="aminue-details">Hong Kong</h6>
            </div>
          </div>
          <div className="companyService-detail">
            <div className="first-section">
              <div className="header-service">
                <span>Quote No</span>
              </div>
              <div className="header-bottomservice">
                <span>QUO-00143716</span>
              </div>
            </div>
            <div className="first-section">
              <div className="header-service">
                <span>Service Level</span>
              </div>
              <div className="header-bottomservice">
                <span>Value - Door to Door</span>
              </div>
            </div>
            <div className="first-section">
              <div className="header-service">
                <span>Valid From</span>
              </div>
              <div className="header-bottomservice">
                <span>5/20/2024</span>
              </div>
            </div>
            <div className="first-section">
              <div className="header-service">
                <span>Valid To</span>
              </div>
              <div className="header-bottomservice">
                <span>6/3/2024</span>
              </div>
            </div>
          </div>
          <div className="shipment-information">
            <span>Shipment Information</span>
          </div>
          <div className="Quotation">
            <h6 className="Quotation-shipment">
              This Quotation applies to the following shipment:
            </h6>
          </div>
          <div className="companyService-detail">
            <div className="first-section">
              <div className="header-service">
                <span>Weight</span>
              </div>
              <div className="header-bottomservice">
                <span>2639.8</span>
              </div>
            </div>
            <div className="first-section">
              <div className="header-service">
                <span>Volume</span>
              </div>
              <div className="header-bottomservice">
                <span>17.83</span>
              </div>
            </div>
            <div className="first-section">
              <div className="header-service">
                <span>Chargeable</span>
              </div>
              <div className="header-bottomservice">
                <span>2972.0</span>
              </div>
            </div>
            <div className="first-section">
              <div className="header-service">
                <span>IncotermQuote</span>
              </div>
              <div className="header-bottomservice">
                <span>FCA</span>
              </div>
            </div>
          </div>
          <div className="companyService-detail">
            <div className="first-section">
              <div className="header-service">
                <span>Customs Entries</span>
              </div>
              <div className="header-bottomservice">
                <span>1</span>
              </div>
            </div>
            <div className="first-section">
              <div className="header-service">
                <span>Entry / Invoice Lines </span>
              </div>
              <div className="header-bottomservice">
                <span>3</span>
              </div>
            </div>
            <div className="first-section">
              <div className="header-service">
                <span>Value of Goods</span>
              </div>
              <div className="header-bottomservice">
                <span></span>
              </div>
            </div>
            <div className="first-section">
              <div className="header-service">
                <span>Insurance Value</span>
              </div>
              <div className="header-bottomservice">
                <span></span>
              </div>
            </div>
          </div>
          <div className="address-content">
            <div className="left-adress">
              <div className="address-header">
                <span className="pickup-title">Pickup Address</span>
              </div>
              <div className="address-bottom">
                {" "}
                <h6>Moradabad, Uttar Pradesh (244001 - India)</h6>
                <h6>IN</h6>
                <h6>India</h6>
              </div>
            </div>
            <div className="left-adress">
              <div className="address-header">
                <span className="pickup-title">Delivery Address</span>
              </div>
              <div className="address-bottom">
                {" "}
                <h6>Miami, Florida (33165 - United States)</h6>
                <h6>US</h6>
                <h6>United States</h6>
              </div>
            </div>
          </div>
          <div className="cargoinformation">
            <div className="left-adress">
              <div className="address-header">
                <span className="pickup-title">Loose Cargo Information</span>
              </div>
              <div className="address-bottom">
                {" "}
                <h6>134 66 x 56 x 36 cm Copper water bottles </h6>
              </div>
            </div>
          </div>
          <div className="quotation-details">
            <div className="quotation-header">
              <span>Quotation Details</span>
            </div>
            <div className="quotation-middle">
              <div className="middle-left">
                <h6></h6> <br />
                <h6>Pick Up and Origin Charges</h6>
                <h6>Freight Charges Airport to Airport (5.94 USD/Kg)</h6>
                <h6>Delivery and Destination Charges</h6>
              </div>
              <div className="middle-middle">
                <h6></h6> <br />
                <h6>775.00</h6>
                <h6>17,646.00</h6>
                <h6>1,933.00</h6>
              </div>
              <div className="middle-right">
                <h6>Currency</h6>
                <h6>USD</h6>
                <h6>USD</h6>
                <h6>USD</h6>
              </div>
            </div>
            <div className="quotation-footer">
              <div className="middle-left">
                <h6>TOTAL CHARGES:</h6>
              </div>
              <div className="middle-middle">
                <h6>20,354.00</h6>
              </div>
              <div className="middle-right">
                <h6>USD</h6>
              </div>
            </div>
          </div>
          <div className="footer-quotation">
            <p>
              Please note that this Quotation is only applicable to the shipment
              defined under "Shipment Information". This Quotation will be
              deemed  invalid after this shipment has been processed. <br />
              Any foreign currency conversions have been undertaken using
              current exchange rates and thus local currency charges are subject
              to change.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Quotedetails;
