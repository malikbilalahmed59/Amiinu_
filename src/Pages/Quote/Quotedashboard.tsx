import { CiSearch } from "react-icons/ci";
import { FaRegCopy } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa6";
import { LuShip } from "react-icons/lu";
import { SlPlane } from "react-icons/sl";
import { TiMessages } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import { Dropdown, Loader } from "rsuite";
import { useRequestList } from "../../Hooks/useRequestList";
import "./quotedashboard.css";
import { Routes } from "../../constant";

import { useMemo, useState } from "react";

const QuoteDashboard = () => {
  const { data, isLoading } = useRequestList();
  const navigate = useNavigate();
  const [filter, setFilter] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredData = useMemo(() => {
    let filtered = data || [];

    // Apply filters
    if (filter.length > 0) {
      filtered = filtered.filter((item) =>
        filter.includes(item.transport_mode)
      );
    }
    // Apply search query
    if (searchQuery) {
      filtered = filtered.filter((item) =>
        item.customer_reference
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      );
    }
    return filtered;
  }, [filter, data, searchQuery]);

  const handleFilterClick = (filterType: string) => {
    setFilter((prevFilter) => {
      if (prevFilter.includes(filterType)) {
        // Remove the filter if it already exists
        return prevFilter.filter((f) => f !== filterType);
      } else {
        // Add the filter if it does not exist
        return [...prevFilter, filterType];
      }
    });
  };
  const handleViewDetailsClick = (type: string, id: number) => {
    switch (type) {
      case "AIR":
        navigate(`../${Routes.QUOTE_DETAILS}/${id}`);
        break;
      case "LCL":
        navigate(`../${Routes.LCL_PDF}/${id}`);
        break;
      default:
        navigate(`../${Routes.LCL_PDF}/${id}`);
        break;
    }
  };

  return (
    <>
      <div className="main">
        <div className="container eses">
          <div className="topsection-main">
            <div className="top-section">
              <div className="left-section">
                <div className="search-bar d-flex">
                  <span className="span">
                    My quotes {data && <>{`(${data.length})`}</>}
                  </span>
                  <form className="d-flex formlabel">
                    <input
                      className="form-control me-2 searchinput"
                      type="search"
                      placeholder="Search"
                      aria-label="Search"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <CiSearch size={"25px"} />
                  </form>
                </div>
              </div>
              <div className="right-section">
                <button className="quote-report">Quote Report</button>
                <button
                  className="quote-report"
                  onClick={() => navigate(`../${Routes.GET_QUOTE}`)}
                >
                  New quote{" "}
                </button>
              </div>
            </div>
          </div>
          <div className="filtercard-parent">
            <div className="filter-card">
              <div
                className={`first-card ${
                  filter.includes("Air") ? "active" : ""
                }`}
                onClick={() => handleFilterClick("Air")}
              >
                <SlPlane /> Air
              </div>
              <div
                className={`first-card ${
                  filter.includes("Sea Air") ? "active" : ""
                }`}
                onClick={() => handleFilterClick("Sea Air")}
              >
                <SlPlane /> Sea Air
              </div>
              <div
                className={`first-card ${
                  filter.includes("FCL") ? "active" : ""
                }`}
                onClick={() => handleFilterClick("FCL")}
              >
                <LuShip /> FCL
              </div>
              <div
                className={`first-card ${
                  filter.includes("LCL") ? "active" : ""
                }`}
                onClick={() => handleFilterClick("LCL")}
              >
                <LuShip /> LCL
              </div>
            </div>
          </div>
          {isLoading && <Loader></Loader>}
          {!isLoading && data && filteredData.length === 0 && (
            <p>No Requests.</p>
          )}
          {filteredData.map((item) => (
            <div className="bottom-cards mb-3" key={item.id}>
              <div className="quoteref-card">
                <div className="ref-top">
                  <div className="top-left">
                    <div className="topleft-left">
                      <LuShip color="blue" />
                      <div>
                        <span className="quote-ref">Quote ref.</span> <br />
                        <span className="quote-id">#Ref123</span>
                      </div>
                    </div>
                    <div className="topleft-rigt">
                      <button className="cancel">cancelled</button>
                    </div>
                  </div>
                  <div className="top-middle">
                    <div className="top-middleleft">
                      <div className="china">
                        <span className="china-quote">Cargo Ready Date</span>
                      </div>
                      <div className="musafa">
                        <span className="china-text">19 May 2024</span>
                      </div>
                    </div>
                    <div className="top-middlemiddle">
                      <div className="china">
                        <span className="china-cargo">
                          CHINA, TEXAS (USZHO)
                        </span>
                      </div>
                      <div className="musafa">
                        <span className="cargo-date">MUSAFA (AEFMZ)</span>
                      </div>
                    </div>
                    <div className="top-middlemiddle">
                      <div className="china">
                        <span className="cargo-quote">Departure date</span>
                      </div>
                      <div className="musafa">
                        <span className="cargo-date">
                          {item.departure_date}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="top-right">
                    <span className="budget">20354 USD</span>
                  </div>
                </div>
                {/* <hr className="hr-line" /> */}
                <div className="ref-bootom">
                  <div className="bottom-left">
                    <div className="topleft-left">
                      <div>
                        <span
                          className="quote-ref"
                          style={{
                            color: "#315CD6",
                            fontFamily: "sans-serif",
                            fontSize: "14px",
                            fontWeight: "700",
                          }}
                        >
                          Cargo details
                        </span>{" "}
                        {/* <FaRegEye color="#315CD6    " size={"15px"} /> */}
                        <Dropdown
                          title={<FaRegEye color="#315CD6" size="15px" />}
                          className="custom-dropdown"
                        >
                          <Dropdown.Item>Export HTML</Dropdown.Item>

                          {/* <Dropdown.Item>New File</Dropdown.Item>
                          <Dropdown.Item>Export PDF</Dropdown.Item>
                          <Dropdown.Item>Settings</Dropdown.Item>
                          <Dropdown.Item>About</Dropdown.Item> */}
                        </Dropdown>
                      </div>
                    </div>
                    {item.service_level ? (
                      <div className="topleft-left">
                        <div>
                          <span className="quote-ref">Service Level</span>{" "}
                          <br />
                          <span className="quote-id">{item.service_level}</span>
                        </div>
                      </div>
                    ) : (
                      <div className="topleft-left">
                        <div>
                          <span className="quote-ref">Service Level</span>{" "}
                          <br />
                          <span className="quote-id">{item.service_level}</span>
                        </div>
                      </div>
                    )}
                    <div className="topleft-left">
                      <div>
                        <span className="quote-ref">My Reference</span> <br />
                        <span className="quote-id">
                          {item.customer_reference}
                        </span>
                      </div>
                    </div>
                    <div className="topleft-left">
                      <div>
                        <span className="quote-ref">Shipment Type</span> <br />
                        <span className="quote-id">{item.transport_mode}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bottom-right">
                    <button
                      className="parent"
                      onClick={() =>
                        handleViewDetailsClick(item.transport_mode, item.id)
                      }
                    >
                      View Details
                    </button>

                    <button className="copy-request">
                      {" "}
                      <FaRegCopy />
                      Copy Request
                    </button>
                    <button className="copy-request">
                      {" "}
                      <TiMessages />
                      Contact us
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default QuoteDashboard;
