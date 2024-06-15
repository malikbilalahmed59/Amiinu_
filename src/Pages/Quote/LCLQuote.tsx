/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  Button,
  ButtonGroup,
  ButtonToolbar,
  Checkbox,
  Col,
  DatePicker,
  FlexboxGrid,
  Form,
  SelectPicker,
} from "rsuite";
import LclCargoForm from "../../Components/LclCargoForm";

import moment from "moment";
import { toast } from "react-toastify";
import CustomSelectPicker from "../../Components/SelectPicker";
import { incotermList } from "../../data/data";
import disablePastDates from "../../helpers/disablePastDates";
import { useLocations } from "../../Hooks/useLocations";
import { axiosInstance } from "../../services/api-client";
import { AirCargo } from "../../services/types";
import FormControl from "./FormControl";
import "./LCLQuote.scss";
import NavBar from "./NavBar";

const LCLQuote = () => {
  const [departureDate, setDepartureDate] = useState<Date | null>(null);
  const [from_location, setFromLocation] = useState("");
  const [to_location, setToLocation] = useState("");
  const [incoterm, setincoterm] = useState("");
  const [customer_reference, setcustomer_reference] = useState("");
  const [serviceType] = useState<any>(null);

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
    setCargo((prevList) => {
      const updatedList = prevList.filter((cargo) => cargo.id !== id);
      return updatedList.map((cargo, index) => ({
        ...cargo,
        id: index + 1,
      }));
    });
  };

  const { data: locationList, isLoading: locationListLoading } = useLocations();

  const transformedLocations =
    !locationListLoading &&
    (locationList || []).map((loc: any) => ({
      label: loc?.name + "," + loc.port_type + "," + loc.country,
      value: loc?.id,
    }));

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
      delivery_address: null,
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
      insurance_needed: null,
      insurance_value: null,
      insurance_currency: null,
      notes: null,
      customer_reference: customer_reference || null,
    };
  };

  const [errors, setErrors] = useState<any>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!from_location) newErrors.from_location = "From location is required.";
    if (!to_location) newErrors.to_location = "To location is required.";
    if (!departureDate) newErrors.departureDate = "Departure date is required.";
    if (!incoterm) newErrors.incoterm = "Incoterm is required.";
    if (!customer_reference)
      newErrors.customer_reference = "Customer reference is required.";

    cargo.forEach((c, index) => {
      if (!c.comiditydiscription)
        newErrors[`cargo_${index}_comiditydiscription`] =
          "Commodity description is required.";
      if (!c.quantity)
        newErrors[`cargo_${index}_quantity`] = "Quantity is required.";
      if (!c.packages)
        newErrors[`cargo_${index}_packages`] = "Package type is required.";
      if (!c.weight) newErrors[`cargo_${index}_weight`] = "Weight is required.";
      if (!c.lcm) newErrors[`cargo_${index}_lcm`] = "Length (L) is required.";
      if (!c.wcm) newErrors[`cargo_${index}_wcm`] = "Width (W) is required.";
      if (!c.hcm) newErrors[`cargo_${index}_hcm`] = "Height (H) is required.";
      if (!c.code_character)
        newErrors[`cargo_${index}_code_character`] = "HS code is required.";

      if (c.dangerous_good) {
        if (!c.dangerous_good_details.un_number)
          newErrors[`cargo_${index}_un_number`] =
            "UN Number is required for dangerous goods.";
        if (!c.dangerous_good_details.proper_shipping_name)
          newErrors[`cargo_${index}_proper_shipping_name`] =
            "Proper shipping name is required for dangerous goods.";
        if (!c.dangerous_good_details.class_division)
          newErrors[`cargo_${index}_class_division`] =
            "Class/Division is required for dangerous goods.";
        if (!c.dangerous_good_details.subdivision)
          newErrors[`cargo_${index}_subdivision`] =
            "Subdivision is required for dangerous goods.";
        if (!c.dangerous_good_details.packaging_group)
          newErrors[`cargo_${index}_packaging_group`] =
            "Packaging group is required for dangerous goods.";
        if (!c.dangerous_good_details.packaging_instructions)
          newErrors[`cargo_${index}_packaging_instructions`] =
            "Packaging instructions are required for dangerous goods.";
        if (!c.dangerous_good_details.DangeriousQuantity)
          newErrors[`cargo_${index}_DangeriousQuantity`] =
            "Quantity is required for dangerous goods.";
        if (!c.dangerous_good_details.total_net_quantity)
          newErrors[`cargo_${index}_total_net_quantity`] =
            "Total net quantity is required for dangerous goods.";
        if (!c.dangerous_good_details.type_of_packing)
          newErrors[`cargo_${index}_type_of_packing`] =
            "Type of packing is required for dangerous goods.";
        if (!c.dangerous_good_details.authorization)
          newErrors[`cargo_${index}_authorization`] =
            "Authorization is required for dangerous goods.";
      }
    });

    setErrors(newErrors);
    return newErrors;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      console.log(errors);
      return;
    }
    setErrors({});
    try {
      const apiData = transformToApiData();
      console.log("apiData", apiData);
      const response = await axiosInstance.post("quote/shipments/", apiData);
      console.log("response", response);
      toast.success("Successfully Submitted");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Fields are required.");
    }
  };
  const [pickup, setPickup] = useState("");
  const [showPickupAddress, setShowPickupAddress] = useState(false);
  const [showDeliveryAddress, setShowDeliveryAddress] = useState(false);
  const [delivery, setDelivery] = useState("");
  const handleCheckboxChange2 = (value: any, checked2: any) => {
    console.log(value);
    setShowPickupAddress(checked2);
  };
  const handleCheckboxChange = (
    value: any,
    checked: boolean | ((prevState: boolean) => boolean)
  ) => {
    console.log(value);
    setShowDeliveryAddress(checked);
  };
  return (
    <>
      <NavBar />
      <div className="container-fluid pabel">
        <Form fluid onSubmit={handleSubmit}>
          <FlexboxGrid className="req-banner" justify="center">
            <FlexboxGrid.Item colspan={22} className="test"></FlexboxGrid.Item>
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
                    <CustomSelectPicker
                      label="FROM"
                      isLoading={locationListLoading}
                      data={transformedLocations || []}
                      name="from"
                      placeholder="From"
                      value={from_location}
                      onChange={(e: any) => {
                        setFromLocation(e);
                      }}
                      error={errors.from_location}
                    />

                    <div className="second-checkbox">
                      <Checkbox
                        onChange={handleCheckboxChange2}
                        className="pickup-services"
                      >
                        Pickup Service
                      </Checkbox>

                      {showPickupAddress && (
                        <div className="input-field">
                          <FormControl
                            type="text"
                            name="Pickup Address"
                            placeholder="Enter Pickup Address"
                            value={pickup}
                            onChange={(e: any) => {
                              setPickup(e);
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </FlexboxGrid.Item>

                  <FlexboxGrid.Item as={Col} xs={24} sm={12} md={12} lg={8}>
                    <Form.Group controlId="to">
                      <Form.ControlLabel className="to">TO</Form.ControlLabel>
                      <SelectPicker
                        loading={locationListLoading}
                        data={transformedLocations || []}
                        searchable
                        name="to"
                        className="w-100"
                        placeholder="Search by Location"
                        value={to_location}
                        onChange={(e: any) => {
                          setToLocation(e);
                        }}
                      />
                      {errors.to_location && (
                        <Form.HelpText className="text-danger">
                          {errors.to_location}
                        </Form.HelpText>
                      )}
                    </Form.Group>
                    <div className="first-checkbox">
                      <Checkbox
                        className="delivery-services"
                        checked={showDeliveryAddress}
                        onChange={(value, checked) =>
                          handleCheckboxChange(value, checked)
                        }
                      >
                        Delivery Service
                      </Checkbox>

                      {showDeliveryAddress && (
                        <div className="" style={{ marginLeft: "10px" }}>
                          <FormControl
                            type="text"
                            name="Delivery Address"
                            placeholder="Enter Delivery Address"
                            value={delivery}
                            onChange={(e: any) => {
                              setDelivery(e);
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </FlexboxGrid.Item>

                  <FlexboxGrid.Item as={Col} xs={24} sm={12} md={12} lg={4}>
                    <Form.Group controlId="datePicker">
                      <Form.ControlLabel className="departure-date">
                        DEPARTURE DATE*
                      </Form.ControlLabel>
                      <DatePicker
                        oneTap
                        name="departureDate"
                        className="w-100"
                        disabledDate={disablePastDates}
                        value={departureDate}
                        onChange={(value: any) => setDepartureDate(value)}
                      />
                      {errors.departureDate && (
                        <Form.HelpText className="text-danger">
                          {errors.departureDate}
                        </Form.HelpText>
                      )}
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
                        data={incotermList}
                        searchable
                        name="incoterm"
                        className="w-100"
                        placeholder="Search by incoterm"
                        value={incoterm}
                        onChange={(value: any) => setincoterm(value)}
                      />

                      {errors.incoterm && (
                        <Form.HelpText className="text-danger">
                          {errors.incoterm}
                        </Form.HelpText>
                      )}
                    </Form.Group>
                  </FlexboxGrid.Item>
                </FlexboxGrid>
              </FlexboxGrid.Item>
            </FlexboxGrid>
          </div>
          <div className="container ">
            <div className="row mt-4">
              <div className="col-md-12">
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
                  {cargo.map((c, i) => (
                    <LclCargoForm
                      index={i}
                      key={c.id}
                      errors={errors}
                      cargoState={c}
                      handleCargoChange={handleCargoChange}
                      handleCargoDelete={handleCargoDelete}
                    />
                  ))}
                  <Button
                    onClick={handleAddCargo}
                    appearance="ghost"
                    style={{ margin: "20px 0px" }}
                  >
                    Add Cargo
                  </Button>
                </div>

                <div className="row mt-3 tt">
                  <div className="col-md-12">
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
                            error={errors.customer_reference}
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
                  appearance="ghost"
                  block
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

export default LCLQuote;
