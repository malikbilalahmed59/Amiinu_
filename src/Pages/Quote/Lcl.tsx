/* eslint-disable @typescript-eslint/no-explicit-any */
import  { useState, useEffect } from "react";
import LclCargoForm from "../../Components/LclCargoForm";
import {
  Col,
  Button,
  ButtonGroup,
  ButtonToolbar,
  FlexboxGrid,
  Form,
  SelectPicker,
  DatePicker,
} from "rsuite";

import { toast } from "react-toastify";
import FormControl from "./FormControl";
import NavBar from "./NavBar";
import { serviceModel } from "./schema";
import "./servicelevel.scss";
import { AirCargo } from "../../services/types";
import { axiosInstance } from "../../services/api-client";
import moment from "moment";

const Lcl = () => {
  const [departureDate, setDepartureDate] = useState<Date | null>(null);
  const [from_location, setFromLocation] = useState("");
  const [to_location, setToLocation] = useState("");
  const [incoterm, setincoterm] = useState("");
  const [customer_reference, setcustomer_reference] = useState("");
  const [serviceType] = useState<any>(null);

  const [location, setLocation] = useState([]);
  const [selected, setSelected] = useState<string>("KG/CM");
  const [celsiusstate, setcelsiusstate] = useState<string>("CELSIUS");


  const searchParams = new URLSearchParams(window.location.search);
  const method = searchParams.get("method");
  const mode = searchParams.get("mode");

  const initialAirCargo = (): AirCargo[] => [
    {
      id: 1,
      comiditydiscription: "",
      quantity: "",
      packages: "",
      weight: "",
      lcm: "",
      wcm: "",
      hcm: "",
      code_character: "",
      v_weight: "",
      tempearture: false,
      dangerous_good: false,
      non_stackable: false,
      temperature_details: {
        min: "",
        max: "",
      },
      dangerous_good_details: {
        un_number: null,
        proper_shipping_name: "",
        class_division: "",
        subdivision: "",
        packaging_group: "",
        packaging_instructions: "",
        DangeriousQuantity: null,
        total_net_quantity: null,
        type_of_packing: "",
        authorization: "",
      },
    },
  ];

  const [cargo, setCargo] = useState<any[]>(initialAirCargo);
  console.log("cargo", cargo);
  const handleCargoChange = (id: number, name: string, value: any) => {
    const updatedCargos = cargo.map((c) => {
      if (c.id === id) {
        const [mainProperty, subProperty] = name.split(".");

        if (subProperty) {
          return {
            ...c,
            [mainProperty]: {
              ...c[mainProperty],
              [subProperty]: value,
            },
          };
        } else {
          return {
            ...c,
            [mainProperty]: value,
          };
        }
      }
      return c;
    });

    setCargo(updatedCargos);
  };

  const handleAddCargo = () => {
    const newId = cargo.length + 1;
    const initialCargo = initialAirCargo()[0];
    const newCargo: AirCargo = {
      id: newId,
      comiditydiscription: initialCargo.comiditydiscription,
      quantity: initialCargo.quantity,
      packages: initialCargo.packages,
      weight: initialCargo.weight,
      lcm: initialCargo.lcm,
      wcm: initialCargo.wcm,
      hcm: initialCargo.hcm,
      code_character: initialCargo.code_character,
      v_weight: initialCargo.v_weight,
      tempearture: initialCargo.tempearture,
      dangerous_good: initialCargo.dangerous_good,
      non_stackable: initialCargo.non_stackable,
      temperature_details: {
        min: initialCargo.temperature_details.min,
        max: initialCargo.temperature_details.max,
      },
      dangerous_good_details: {
        un_number: initialCargo.dangerous_good_details.un_number,
        proper_shipping_name:
          initialCargo.dangerous_good_details.proper_shipping_name,
        class_division: initialCargo.dangerous_good_details.class_division,
        subdivision: initialCargo.dangerous_good_details.subdivision,
        packaging_group: initialCargo.dangerous_good_details.packaging_group,
        packaging_instructions:
          initialCargo.dangerous_good_details.packaging_instructions,
        DangeriousQuantity:
          initialCargo.dangerous_good_details.DangeriousQuantity,
        total_net_quantity:
          initialCargo.dangerous_good_details.total_net_quantity,
        type_of_packing: initialCargo.dangerous_good_details.type_of_packing,
        authorization: initialCargo.dangerous_good_details.authorization,
      },
    };
    setCargo([...cargo, newCargo]);
  };

  const handleCargoDelete = (id: number | string) => {
    setCargo(prevList => {
      const updatedList = prevList.filter(cargo => cargo.id !== id);
      return updatedList.map((cargo, index) => ({
        ...cargo,
        id: index + 1, 
      }));
    });
  };

  console.log("cargo", cargo);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await axiosInstance.get("/quote/locations/");
        console.log("location", response);
        setLocation(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLocation();
  }, []);

  const transformedLocations = location.map((loc: any) => ({
    label: loc?.name + "," + loc.port_type + "," + loc.country,
    value: loc?.id,
  }));

  const disablePastDates = (date: any) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const transformToApiData = () => {
    
    return {
      type: method,
      transport_mode: mode,
      from_location: from_location,
      to_location: to_location,
      departure_date: departureDate
        ? moment(departureDate).format("YYYY-MM-DD")
        : null,
      incoterm: incoterm,
      pickup_service: false,
      delivery_service: false,
      pickup_address: null,
      delivery_address:null,
      cargo: cargo.map((container) => ({
        description: container.comiditydiscription || null,
        container_type: "40ST",
        quantity: container.quantity || null,
        weight: container.weight || null,
        length: container.lcm || null,
        width: container.weight || null,
        height: container.hcm || null,
        hs_code: container.code_character || null,
        oversize: null,
        non_stackable: container.non_stackable,
        dangerous_goods: container.dangerous_good,
        dangerous_good_details: container.dangerous_good
          ? {
              un_number: container.dangerous_good_details?.un_number || null,
              proper_shipping_name:
                container.dangerous_good_details?.proper_shipping_name || null,
              class_division:
                container.dangerous_good_details?.class_division || null,
              subdivision:
                container.dangerous_good_details?.subdivision || null,
              packaging_group:
                container.dangerous_good_details.packaging_group || null,
              packaging_instructions:
                container.dangerous_good_details?.packaging_instructions ||
                null,
              quantity:
                container.dangerous_good_details.DangeriousQuantity || null,
              total_net_quantity:
                container.dangerous_good_details?.total_net_quantity || null,
              type_of_packing:
                container.dangerous_good_details?.type_of_packing || null,
              authorization:
                container.dangerous_good_details?.authorization || null,
            }
          : {},
        reefer: false,
        reefer_details: {},
    })),
      service_level:
        serviceType === "air-value"
          ? 1
          : serviceType === "air-premium"
          ? 2
          : serviceType === "air-now"
          ? 3
          : null,
      insurance_needed:  null,
      insurance_value:  null,
      insurance_currency:  null,
      notes:  null,
      customer_reference: customer_reference || null,
    };
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const apiData = transformToApiData();
      console.log("apiData", apiData);
      const response = await axiosInstance.post("quote/shipments/", apiData);
      console.log("response", response);
      toast.success("Successfully Submitted")
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Unable to submit")
    }
  };

  console.log(departureDate);
  return (
    <>
      <NavBar />
      <div className="container-fluid pabel">
        <Form model={serviceModel} fluid onSubmit={handleSubmit}>
          <FlexboxGrid className="req-banner" justify="center" >
            <FlexboxGrid.Item
              colspan={22}
              className="test"
            ></FlexboxGrid.Item>
          </FlexboxGrid>
          <div className="conatiner ">
            <FlexboxGrid justify="center" className="filter-bar first-box">
              <FlexboxGrid.Item
                colspan={20}
                as={Form}
                style={{ background: "", borderRadius: "4px" }}
                className="first-boxitem"
                fluid
              >
                <FlexboxGrid className="p-2" justify="space-between">
                  <FlexboxGrid.Item
                    as={Col}
                    xs={24}
                    sm={12}
                    md={12}
                    lg={8}
                    className="from"
                  >
                    <Form.Group controlId="from">
                
                      <Form.ControlLabel className="fromLabel">
                        FROM
                      </Form.ControlLabel>
                      <SelectPicker
                        data={transformedLocations}
                        searchable
                        name="from"
                        className="w-100"
                        placeholder="Search by Location"
                        value={from_location}
                        onChange={(e: any) => {
                          setFromLocation(e);
                        }}
                      />
                    </Form.Group>
                  
                  </FlexboxGrid.Item>

                  <FlexboxGrid.Item as={Col} xs={24} sm={12} md={12} lg={8}>
                    <Form.Group controlId="to">
                      <Form.ControlLabel className="to">TO</Form.ControlLabel>
                      <SelectPicker
                        data={transformedLocations}
                        searchable
                        name="to"
                        className="w-100"
                        placeholder="Search by Location"
                        value={to_location}
                        onChange={(e: any) => {
                          setToLocation(e);
                        }}
                      />
                    </Form.Group>
                  
                  </FlexboxGrid.Item>

                  <FlexboxGrid.Item as={Col} xs={24} sm={12} md={12} lg={4}>
                    <Form.Group controlId="datePicker">
                      <Form.ControlLabel className="departure-date">
                        DEPARTURE DATE*
                      </Form.ControlLabel>
                      <DatePicker
                        oneTap
                        // {...register("departureDate")}
                        // error={errors.departureDate?.message}
                        name="departureDate"
                        className="w-100"
                        disabledDate={disablePastDates}
                        value={departureDate}
                        onChange={(value:any) => setDepartureDate(value)}
                      />
                      {/* {formErrors?.departureDate && (
                    <Form.HelpText className="text-danger">
                      {formErrors?.departureDate}
                    </Form.HelpText>
                  )} */}
                    </Form.Group>
                  </FlexboxGrid.Item>

                  <FlexboxGrid.Item
                    as={Col}
                    xs={24}
                    sm={12}
                    md={12}
                    lg={4}
                    className="incoterm-item"
                  >
                    <Form.Group controlId="incoterm">
                      <Form.ControlLabel className="incoterm">
                        INCOTERM*{" "}
                        <a href="#" className="click-details">
                          Click for details
                        </a>
                      </Form.ControlLabel>
                      <SelectPicker
                        data={[
                          ["EXW", "EXW - Ex Works"],
                          ["FCA", "FCA - Free Carrier"],
                          ["FOB", "FOB - Free On Board"],
                          ["CPT", "CPT - Carriage Paid To"],
                          ["CFR", "CFR - Cost and Freight"],
                          ["CIF", "CIF - Cost, Insurance and Freight"],
                          ["CIP", "CIP - Carriage and Insurance Paid To"],
                          ["DAP", "DAP - Delivered At Place"],
                          ["DDP", "DDP - Delivered Duty Paid"],
                        ].map(([value, label]) => ({ label, value }))}
                        searchable
                        // {...register("incoterm")}
                        name="incoterm"
                        // error={errors.incoterm?.message}
                        className="w-100"
                        placeholder="Search by incoterm"
                        value={incoterm}
                        onChange={(value: any) => setincoterm(value)}
                      />
                      {/* {formErrors?.incoterm && (
                    <Form.HelpText className="text-danger">
                      {formErrors?.incoterm}
                    </Form.HelpText>
                  )} */}
                    </Form.Group>
                  </FlexboxGrid.Item>
                </FlexboxGrid>
              </FlexboxGrid.Item>

              {/* <div className="col-md-3 mt-2">
                <Form.Group controlId="to">
                  <Checkbox>Label</Checkbox>
                </Form.Group>
              </div> */}
            </FlexboxGrid>
           
          </div>
          <div className="container ">
            <div className="row mt-4">
              <div className="col-md-8">
                <div className="top-section">
                  <div className="leftTop ">
                    <span>Cargo</span>
                  </div>
                  <div className="rightTop">
                    <ButtonToolbar>
                      <ButtonGroup>
                        <Button
                          appearance="primary"
                          onClick={() => setSelected("KG/CM")}
                          style={{
                            padding: "10px 20px",
                            border: "1px solid #04205f",
                            backgroundColor:
                              selected === "KG/CM" ? "#04205f" : "white",
                            color: selected === "KG/CM" ? "white" : "black",
                            cursor: "pointer",
                            transition: "background-color 0.3s, color 0.3s",
                          }}
                        >
                          KG/CM
                        </Button>
                        <Button
                          appearance="ghost"
                          onClick={() => setSelected("LB/IN")}
                          style={{
                            padding: "10px 20px",
                            border: "1px solid #04205f",
                            backgroundColor:
                              selected === "LB/IN" ? "#04205f" : "white",
                            color: selected === "LB/IN" ? "white" : "black",
                            cursor: "pointer",
                            transition: "background-color 0.3s, color 0.3s",
                          }}
                        >
                          LB/IN
                        </Button>
                      </ButtonGroup>
                      <ButtonGroup>
                        <Button
                          appearance="primary"
                          onClick={() => setcelsiusstate("CELSIUS")}
                          style={{
                            padding: "10px 20px",
                            border: "1px solid #04205f",
                            backgroundColor:
                              celsiusstate === "CELSIUS" ? "#04205f" : "white",
                            color:
                              celsiusstate === "CELSIUS" ? "white" : "black",
                            cursor: "pointer",
                            transition: "background-color 0.3s, color 0.3s",
                          }}
                        >
                          CELSIUS
                        </Button>
                        <Button
                          appearance="ghost"
                          onClick={() => setcelsiusstate("FAHRENHEIT")}
                          style={{
                            padding: "10px 20px",
                            border: "1px solid #04205f",
                            backgroundColor:
                              celsiusstate === "FAHRENHEIT"
                                ? "#04205f"
                                : "white",
                            color:
                              celsiusstate === "FAHRENHEIT" ? "white" : "black",
                            cursor: "pointer",
                            transition: "background-color 0.3s, color 0.3s",
                          }}
                        >
                          FAHRENHEIT
                        </Button>
                      </ButtonGroup>
                    </ButtonToolbar>
                  </div>
                </div>

                <div>
                  {cargo.map((c) => (
                    <LclCargoForm
                      key={c.id}
                      cargoState={c}
                      handleCargoChange={handleCargoChange}
                      handleCargoDelete={handleCargoDelete}
                    />
                  ))}
                  <Button
                    onClick={handleAddCargo}
                    appearance="primary"
                    style={{ margin: "20px 0px" }}
                  >
                    Add Cargo
                  </Button>
                </div>

                <div className="row mt-3 tt">
                  <div className="col-md-8">
                    <div className="reference">
                      <div className="refer-title">
                        <span>References</span>
                      </div>
                      <div className="referBottom-section mt-2">
                        <div className="reference-section">
                          <FormControl
                            label="CUSTOMER REF.*"
                            name="customer_reference"
                            placeholder="Type something....."
                            value={customer_reference}
                            onChange={(e: any) => {
                              setcustomer_reference(e);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
             
              </div>
            </div>
          </div>

          <div className="col-md-4"></div>

          <div className="container">
            <Form.Group className="mt-3">
              <ButtonToolbar>
                <Button
                
                  onClick={(e) => handleSubmit(e)}
                

                  appearance="primary"
                  color="red"
                  style={{ width: "100px", marginBottom: "20px" }}
                >
                  Submit
                </Button>
              </ButtonToolbar>
            </Form.Group>
          </div>
        </Form>
      </div>
    </>
  );
};

export default Lcl;
