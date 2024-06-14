import  { useState } from "react";
import "./getquote.css";
import { GiCommercialAirplane } from "react-icons/gi";
import { LiaShipSolid } from "react-icons/lia";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Col,
  FlexboxGrid,
  Heading,
  Panel,
  Radio,
  RadioGroup,
  RadioTile,
  Text,
} from "rsuite";
import { Routes } from "../../constant";
const GetQuote = () => {
  const [mode, setMode] = useState("FCL");
  const [method, setMethod] = useState("IMPORT");

  const navigate = useNavigate();
  const options = [
    {
      icon: LiaShipSolid,
      title: "FCL",
      value: "FCL",
    },
    {
      icon: LiaShipSolid,
      title: "LCL",
      value: "LCL",
    },
    {
      icon: GiCommercialAirplane,
      title: "AIR",
      value: "AIR",
    },
    {
      icon: LiaShipSolid,
      title: "SEA AIR",
      value: "SEA_AIR",
    },
  ];
  return (
    <FlexboxGrid
      style={{
        height: "100vh",
        justifyContent: "center",
        alignItems: "start",
      }}
      className="quote-card"
    >
      <FlexboxGrid.Item colspan={18} className="grid-item">
        <FlexboxGrid.Item colspan={24} className="text-center griditem-second">
          <Text className="py-3 quote-request">Initializing Quote Request</Text>
          <Heading level={4} className=" u-shipping">
            What are you shipping?
          </Heading>
        </FlexboxGrid.Item>
        <Panel bordered className="parent-bottom">
          <FlexboxGrid className="bottom-grid">
            <FlexboxGrid.Item
              as={Col}
              xs={24}
              sm={24}
              md={12}
              lg={6}
              xl={6}
              className="griditem-last"
            >
              <Heading level={6} className="method">
                Type
              </Heading>
              <RadioGroup
                className="mt-3"
                name="radio-group-inline"
                inline
                onChange={(e) => setMethod(e.toString())}
                defaultValue={method}
              >
                <Radio value="IMPORT" className="import">
                  Import
                </Radio>
                <Radio value="EXPORT" className="import">
                  Export
                </Radio>
              </RadioGroup>
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={14} className="test">
              <Heading level={6} className="ps-1 method">
                Transport Mode
              </Heading>
              <FlexboxGrid>
                {options.map((o, i) => (
                  <FlexboxGrid.Item
                    as={Col}
                    xs={24}
                    sm={24}
                    md={12}
                    lg={6}
                    xl={6}
                    className="small-card"
                  >
                    <RadioTile
                      style={{
                        background: "#FFFFFF",
                        justifyContent: "center",
                      }}
                      key={i}
                      onChange={() => setMode(o.value)}
                      value={o.value}
                      checked={o.value === mode}
                      title="Private"
                      name="Private"
                      className="text-center"
                    >
                      <o.icon size={48} color="#E96857" />
                      <br />
                      {o.title}
                    </RadioTile>
                  </FlexboxGrid.Item>
                ))}
              </FlexboxGrid>
            </FlexboxGrid.Item>
            <FlexboxGrid>
              <FlexboxGrid.Item
                colspan={4}
                className="text-center getguote-btn"
              >
                <Button
                  appearance="primary"
                  onClick={() => {
                    if (mode == "AIR") {
                      navigate(
                        `../${Routes.Servicelevel}?method=${method}&mode=${mode}`
                      );
                    } else if (mode == "LCL") {
                      navigate(
                        `../${Routes.Lcl}?method=${method}&mode=${mode}`
                      );
                    } else {
                      navigate(
                        `../${Routes.REQ_QUOTE}?method=${method}&mode=${mode}`
                      );
                    }
                  }}
                >
                  Get Quote
                </Button>
              </FlexboxGrid.Item>
            </FlexboxGrid>
          </FlexboxGrid>
        </Panel>
      </FlexboxGrid.Item>
    </FlexboxGrid>
  );
};

export default GetQuote;
