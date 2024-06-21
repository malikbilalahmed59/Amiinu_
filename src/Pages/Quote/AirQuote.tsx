/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  ButtonToolbar,
  Checkbox,
  Col,
  DatePicker,
  FlexboxGrid,
  Form,
  Uploader,
} from "rsuite";
import CargoForm from "../../Components/CargoForm";

import moment from "moment";
import { toast } from "react-toastify";
import { FileType } from "rsuite/esm/Uploader";
import CustomSelectPicker from "../../Components/SelectPicker";
import { currencyChoices, incotermList, servicesLevel } from "../../data/data";
import { axiosInstance } from "../../services/api-client";
import { AirCargo } from "../../services/types";
import "./AirQuote.scss";
import FormControl from "./FormControl";
import NavBar from "./NavBar";

const AirQuote = () => {
  const [formData, setFormData] = useState<any>({
    showDeliveryAddress: false,
    insureType: "",
    departureDate: null,
    insureAgree: false,
    from_location: "",
    to_location: "",
    incoterm: "",
    pickup: "",
    delivery: "",
    amount: "",
    currency: "",
    customer_reference: "",
    comment: "",
    fileList: [],
    serviceType: "",
    location: [],
    selected: "KG/CM",
    celsiusState: "CELSIUS",
    showPickupAddress: false,
    cargo: [
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
    ],
  });

  const [errors, setErrors] = useState<any>({});

  const handleCheckboxChange2 = (_value: any, checked2: any) => {
    setFormData((prevState: any) => ({
      ...prevState,
      showPickupAddress: checked2,
    }));
  };

  const handleCheckboxChange = (
    _value: any,
    checked: boolean | ((prevState: boolean) => boolean)
  ) => {
    setFormData((prevState: any) => ({
      ...prevState,
      showDeliveryAddress: checked,
    }));
  };

  const handleCargoChange = (id: number, name: string, value: any) => {
    const updatedCargos = formData.cargo.map((c: { [x: string]: any; id: number; }) => {
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

    setFormData((prevState: any) => ({
      ...prevState,
      cargo: updatedCargos,
    }));
  };

  const handleAddCargo = () => {
    const newId = formData.cargo.length + 1;
    const initialCargo = formData.cargo[0];
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
      non_stackable: initialCargo.non_stackable,
      dangerous_good: initialCargo.dangerous_good,
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
    setFormData((prevState: { cargo: any; }) => ({
      ...prevState,
      cargo: [...prevState.cargo, newCargo],
    }));
  };

  const handleCargoDelete = (id: number | string) => {
    setFormData((prevState: { cargo: any[]; }) => {
      const updatedList = prevState.cargo.filter((cargo: { id: string | number; }) => cargo.id !== id);
      return {
        ...prevState,
        cargo: updatedList.map((cargo: any, index: number) => ({
          ...cargo,
          id: index + 1,
        })),
      };
    });
  };

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await axiosInstance.get("/quote/locations/");
        setFormData((prevState: any) => ({
          ...prevState,
          location: response.data,
        }));
      } catch (error) {
        console.log(error);
      }
    };
    fetchLocation();
  }, []);

  const transformedLocations = formData.location.map((loc: any) => ({
    label: loc?.name + "," + loc.port_type + "," + loc.country,
    value: loc?.id,
  }));

  const disablePastDates = (date: any) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const validateForm = () => {
    const newErrors: any = {};

    if (!formData.from_location)
      newErrors.from_location = "From location is required.";
    if (!formData.to_location)
      newErrors.to_location = "To location is required.";
    if (!formData.departureDate)
      newErrors.departureDate = "Departure date is required.";
    if (!formData.incoterm) newErrors.incoterm = "Incoterm is required.";
    if (!formData.customer_reference)
      newErrors.customer_reference = "Customer reference is required.";

    if (formData.showPickupAddress && !formData.pickup) {
      newErrors.pickup = "Pickup address is required.";
    }

    if (formData.showDeliveryAddress && !formData.delivery) {
      newErrors.delivery = "Delivery address is required.";
    }

    formData.cargo.forEach((cargo: { comiditydiscription: any; quantity: any; packages: any; weight: any; lcm: any; wcm: any; hcm: any; code_character: any; dangerous_good: any; dangerous_good_details: { un_number: any; proper_shipping_name: any; class_division: any; subdivision: any; packaging_group: any; packaging_instructions: any; DangeriousQuantity: any; total_net_quantity: any; type_of_packing: any; authorization: any; }; tempearture: any; temperature_details: { min: any; max: any; }; }, index: any) => {
      if (!cargo.comiditydiscription)
        newErrors[`cargo_${index}_comiditydiscription`] =
          "Description is required.";
      if (!cargo.quantity)
        newErrors[`cargo_${index}_quantity`] = "Quantity is required.";
      if (!cargo.packages)
        newErrors[`cargo_${index}_packages`] = "Packages are required.";
      if (!cargo.weight)
        newErrors[`cargo_${index}_weight`] = "Weight is required.";
      if (!cargo.lcm) newErrors[`cargo_${index}_lcm`] = "Length is required.";
      if (!cargo.wcm) newErrors[`cargo_${index}_wcm`] = "Width is required.";
      if (!cargo.hcm) newErrors[`cargo_${index}_hcm`] = "Height is required.";
      if (!cargo.code_character)
        newErrors[`cargo_${index}_code_character`] = "HS code is required.";

      if (cargo.dangerous_good) {
        if (!cargo.dangerous_good_details.un_number)
          newErrors[`cargo_${index}_un_number`] =
            "UN Number is required for dangerous goods.";
        if (!cargo.dangerous_good_details.proper_shipping_name)
          newErrors[`cargo_${index}_proper_shipping_name`] =
            "Proper shipping name is required for dangerous goods.";
        if (!cargo.dangerous_good_details.class_division)
          newErrors[`cargo_${index}_class_division`] =
            "Class/Division is required for dangerous goods.";
        if (!cargo.dangerous_good_details.subdivision)
          newErrors[`cargo_${index}_subdivision`] =
            "Subdivision is required for dangerous goods.";
        if (!cargo.dangerous_good_details.packaging_group)
          newErrors[`cargo_${index}_packaging_group`] =
            "Packaging group is required for dangerous goods.";
        if (!cargo.dangerous_good_details.packaging_instructions)
          newErrors[`cargo_${index}_packaging_instructions`] =
            "Packaging instructions are required for dangerous goods.";
        if (!cargo.dangerous_good_details.DangeriousQuantity)
          newErrors[`cargo_${index}_DangeriousQuantity`] =
            "Quantity is required for dangerous goods.";
        if (!cargo.dangerous_good_details.total_net_quantity)
          newErrors[`cargo_${index}_total_net_quantity`] =
            "Total net quantity is required for dangerous goods.";
        if (!cargo.dangerous_good_details.type_of_packing)
          newErrors[`cargo_${index}_type_of_packing`] =
            "Type of packing is required for dangerous goods.";
        if (!cargo.dangerous_good_details.authorization)
          newErrors[`cargo_${index}_authorization`] =
            "Authorization is required for dangerous goods.";
      }

      if (cargo.tempearture) {
        if (!cargo.temperature_details.min)
          newErrors[`cargo_${index}_temperature_min`] =
            "Min temperature is required.";
        if (!cargo.temperature_details.max)
          newErrors[`cargo_${index}_temperature_max`] =
            "Max temperature is required.";
      }
    });

    setErrors(newErrors);
    return newErrors;
  };
  const searchParams = new URLSearchParams(window.location.search);
  const transformToApiData = () => {
    return {
      type: searchParams.get("method"),
      transport_mode: searchParams.get("mode"),
      from_location: formData.from_location,
      to_location: formData.to_location,
      departure_date: formData.departureDate
        ? moment(formData.departureDate).format("YYYY-MM-DD")
        : null,
      incoterm: formData.incoterm,
      pickup_service: formData.showPickupAddress,
      delivery_service: formData.showDeliveryAddress,
      pickup_address: formData.showPickupAddress ? formData.pickup : null,
      delivery_address: formData.showDeliveryAddress ? formData.delivery : null,
      cargo: formData.cargo.map((container: { comiditydiscription: any; quantity: any; weight: any; lcm: any; hcm: any; code_character: any; dangerous_good: any; dangerous_good_details: { un_number: any; proper_shipping_name: any; class_division: any; subdivision: any; packaging_group: any; packaging_instructions: any; DangeriousQuantity: any; total_net_quantity: any; type_of_packing: any; authorization: any; }; tempearture: any; temperature_details: { max: any; min: any; }; }) => ({
        description: container.comiditydiscription || null,
        container_type: "40ST",
        item_type: null,
        quantity: container.quantity || null,
        weight: container.weight || null,
        length: container.lcm || null,
        width: container.weight || null,
        height: container.hcm || null,
        hs_code: container.code_character || null,
        oversize: null,
        non_stackable: null,
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
        reefer: container.tempearture,
        reefer_details: container.temperature_details
          ? {
              temperature: null,
              ventilation: null,
              humidity: null,
              temperature_max: container.temperature_details.max,
              temperature_min: container.temperature_details.min,
            }
          : {},
      })),
      service_level:
        formData.serviceType === "air-value"
          ? 1
          : formData.serviceType === "air-premium"
          ? 2
          : formData.serviceType === "air-now"
          ? 3
          : null,
      insurance_needed: formData.insureAgree || null,
      insurance_value: formData.amount || null,
      insurance_currency: formData.currency || null,
      notes: formData.comment || null,
      customer_reference: formData.customer_reference || null,
    };
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
      toast.error("Unable to submit");
    }
  };

  return (
    <>
      <NavBar />
      <div className="container-fluid pabel">
        <Form fluid onSubmit={handleSubmit}>
          <FlexboxGrid className="req-banner" justify="center" align="bottom">
            <FlexboxGrid.Item
              colspan={22}
              className="testttt"
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
                    {/* Form Input */}
                    <CustomSelectPicker
                      label="FROM"
                      name="from"
                      data={transformedLocations}
                      placeholder="Search by Location"
                      value={formData.from_location}
                      onChange={(e: any) => {
                        setFormData((prevState: any) => ({
                          ...prevState,
                          from_location: e,
                        }));
                      }}
                      error={errors.from_location}
                    />
                    <div className="second-checkbox">
                      <Checkbox
                        onChange={handleCheckboxChange2}
                        checked={formData.showPickupAddress}
                        className="pickup-services"
                      >
                        Pickup Service
                      </Checkbox>

                      {formData.showPickupAddress && (
                        <div className="input-field">
                          <FormControl
                            type="text"
                            name="Pickup Address"
                            placeholder="Enter Pickup Address"
                            value={formData.pickup}
                            onChange={(e: any) => {
                              setFormData((prevState: any) => ({
                                ...prevState,
                                pickup: e,
                              }));
                            }}
                            error={errors.pickup}
                          />
                        </div>
                      )}
                    </div>
                  </FlexboxGrid.Item>

                  <FlexboxGrid.Item as={Col} xs={24} sm={12} md={12} lg={8}>
                    <CustomSelectPicker
                      data={transformedLocations}
                      name="to"
                      placeholder="Search by Location"
                      value={formData.to_location}
                      onChange={(e: any) => {
                        setFormData((prevState: any) => ({
                          ...prevState,
                          to_location: e,
                        }));
                      }}
                      label="TO"
                      error={errors.to_location}
                    />
                    <div className="first-checkbox">
                      <Checkbox
                        className="delivery-services"
                        checked={formData.showDeliveryAddress}
                        onChange={(value, checked) =>
                          handleCheckboxChange(value, checked)
                        }
                      >
                        Delivery Service
                      </Checkbox>

                      {formData.showDeliveryAddress && (
                        <div className="" style={{ marginLeft: "10px" }}>
                          <FormControl
                            type="text"
                            name="Delivery Address"
                            placeholder="Enter Delivery Address"
                            value={formData.delivery}
                            onChange={(e: any) => {
                              setFormData((prevState: any) => ({
                                ...prevState,
                                delivery: e,
                              }));
                            }}
                            error={errors.delivery}
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
                        value={formData.departureDate}
                        onChange={(value: any) =>
                          setFormData((prevState: any) => ({
                            ...prevState,
                            departureDate: value,
                          }))
                        } 
                      />
                      {errors.departureDate && (
                        <Form.HelpText className="text-danger">{errors.departureDate}</Form.HelpText>
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
                    <CustomSelectPicker
                      label={
                        <>
                          INCOTERM*{" "}
                          <a href="#" className="click-details">
                            Click for details
                          </a>
                        </>
                      }
                      data={incotermList}
                      placeholder="Search by incoterm"
                      value={formData.incoterm}
                      name="incoterm"
                      onChange={(value: any) =>
                        setFormData((prevState: any) => ({
                          ...prevState,
                          incoterm: value,
                        }))
                      }
                      error={errors.incoterm}
                    />
                  </FlexboxGrid.Item>
                </FlexboxGrid>
              </FlexboxGrid.Item>
            </FlexboxGrid>
            <div className="container">
              <div className="row flex-row ">
                <span className="mt-3 mb-3 ">Choose a service level</span>
                {servicesLevel.map((s, i) => (
                  <div
                    className="col-md-4"
                    key={i}
                    onClick={() => {
                      setFormData((prevState: any) => ({
                        ...prevState,
                        serviceType: s.value,
                      }));
                    }}
                  >
                    <div
                      style={{
                        cursor: "pointer",
                        border:
                          s.value === formData.serviceType
                            ? "1px solid #0062ff"
                            : "none",
                        borderRadius:
                          s.value === formData.serviceType ? "0.375rem" : "0px",
                      }}
                    >
                      <div className="card p-3">
                        <div className="card-body d-flex flex-column gap-3 justify-content-center align-items-center">
                          <img src={s.icon} alt={s.title} />
                          <h5 className="card-title">{s.title}</h5>
                          <p className="card-text text-center">{s.desc}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row mt-4">
              <div className="col-md-12">
                <div className="top-section">
                  <div className="leftTop">
                    <span>Cargo</span>
                  </div>
                  <div className="rightTop">
                    <ButtonToolbar>
                      <ButtonGroup>
                        <Button
                          appearance="primary"
                          onClick={() =>
                            setFormData((prevState: any) => ({
                              ...prevState,
                              selected: "KG/CM",
                            }))
                          }
                          style={{
                            padding: "10px 20px",
                            border: "1px solid #04205f",
                            backgroundColor:
                              formData.selected === "KG/CM"
                                ? "#04205f"
                                : "white",
                            color:
                              formData.selected === "KG/CM" ? "white" : "black",
                            cursor: "pointer",
                            transition: "background-color 0.3s, color 0.3s",
                          }}
                        >
                          KG/CM
                        </Button>
                        <Button
                          appearance="ghost"
                          onClick={() =>
                            setFormData((prevState: any) => ({
                              ...prevState,
                              selected: "LB/IN",
                            }))
                          }
                          style={{
                            padding: "10px 20px",
                            border: "1px solid #04205f",
                            backgroundColor:
                              formData.selected === "LB/IN"
                                ? "#04205f"
                                : "white",
                            color:
                              formData.selected === "LB/IN" ? "white" : "black",
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
                          onClick={() =>
                            setFormData((prevState: any) => ({
                              ...prevState,
                              celsiusState: "CELSIUS",
                            }))
                          }
                          style={{
                            padding: "10px 20px",
                            border: "1px solid #04205f",
                            backgroundColor:
                              formData.celsiusState === "CELSIUS"
                                ? "#04205f"
                                : "white",
                            color:
                              formData.celsiusState === "CELSIUS"
                                ? "white"
                                : "black",
                            cursor: "pointer",
                            transition: "background-color 0.3s, color 0.3s",
                          }}
                        >
                          CELSIUS
                        </Button>
                        <Button
                          appearance="ghost"
                          onClick={() =>
                            setFormData((prevState: any) => ({
                              ...prevState,
                              celsiusState: "FAHRENHEIT",
                            }))
                          }
                          style={{
                            padding: "10px 20px",
                            border: "1px solid #04205f",
                            backgroundColor:
                              formData.celsiusState === "FAHRENHEIT"
                                ? "#04205f"
                                : "white",
                            color:
                              formData.celsiusState === "FAHRENHEIT"
                                ? "white"
                                : "black",
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
                  {formData.cargo.map((c: AirCargo, i: number) => (
                    <CargoForm
                      errors={errors}
                      index={i}
                      key={c.id}
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
                            value={formData.customer_reference}
                            onChange={(e: any) => {
                              setFormData((prevState: any) => ({
                                ...prevState,
                                customer_reference: e,
                              }));
                            }}
                            error={errors.customer_reference}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row mt-3 tt">
                  <div className="col-md-12">
                    <div className="reference">
                      <div className="refer-title">
                        <span>Insurance</span>
                      </div>
                      <div className="referBottom-section mt-2">
                        <div className="reference-section">
                          <span>Do you want to insure your goods?</span>
                          <div className="row">
                            <div className="col-md-4">
                              <Checkbox
                                checked={formData.insureType === "doNotInsure"}
                                onClick={() =>
                                  setFormData((prevState: any) => ({
                                    ...prevState,
                                    insureType: "doNotInsure",
                                  }))
                                }
                              >
                                Do not insure goods
                              </Checkbox>
                            </div>
                            <div className="col-md-4">
                              <Checkbox
                                checked={
                                  formData.insureType === "insureWithValue"
                                }
                                onClick={() =>
                                  setFormData((prevState: any) => ({
                                    ...prevState,
                                    insureType: "insureWithValue",
                                  }))
                                }
                              >
                                Insure goods for a value of
                              </Checkbox>
                            </div>
                            <div className="col-md-4">
                              <div className="input-group mb-3">
                                <button
                                  className="btn btn-outline-secondary dropdown-toggle"
                                  type="button"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="false"
                                >
                                  {(formData.amount === ""
                                    ? "Amount"
                                    : formData.amount + " " + formData.currency
                                  ).toString()}
                                </button>
                                <ul className="dropdown-menu">
                                  {currencyChoices.map((currency) => {
                                    return (
                                      <li
                                        className="p-2"
                                        style={{ cursor: "pointer" }}
                                        onClick={() =>
                                          setFormData((prevState: any) => ({
                                            ...prevState,
                                            currency: currency.value,
                                          }))
                                        }
                                      >
                                        {currency.value}
                                      </li>
                                    );
                                  })}
                                </ul>
                                <input
                                  type="number"
                                  className="form-control"
                                  aria-label="Text input with dropdown button"
                                  value={formData.amount}
                                  onChange={(e: any) => {
                                    setFormData((prevState: any) => ({
                                      ...prevState,
                                      amount: e.target.value,
                                    }));
                                  }} 
                                />
                              </div>
                            </div>
                            {formData.insureType === "insureWithValue" && (
                              <div className="col-md-12">
                                <Checkbox
                                  value={formData.insureAgree ? "yes" : "no"}
                                  checked={formData.insureAgree}
                                  onChange={(e) =>
                                    setFormData((prevState: any) => ({
                                      ...prevState,
                                      insureAgree: e === "yes" ? true : false,
                                    }))
                                  }
                                >
                                  <p>
                                    I have read and accepted the{" "}
                                    <span style={{ color: "#0062ff" }}>
                                      insurance Terms & Conditions
                                    </span>
                                  </p>
                                </Checkbox>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bottomlast mt-3">
                  <span className="title-note">Notes</span>
                  <div className="mainParent mt-2">
                    <div className="row">
                      <div className="col-md-8 comment ">
                        <div className="comment-div">
                          <FormControl
                            type="textarea"
                            label="Comments (max. 500 characters)"
                            placeholder=""
                            name="comment"
                            value={formData.comment}
                            onChange={(e: any) => {
                              setFormData((prevState: any) => ({
                                ...prevState,
                                comment: e,
                              }));
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-md-4 comment">
                        <div className="comment-div">
                          {formData.fileList &&
                            formData.fileList.length === 0 && (
                              <>
                                <span className="">No attached files</span>
                              </>
                            )}
                          <span className="">Files</span> <br />
                          <Uploader
                            action=""
                            fileList={formData.fileList}
                            onChange={(f: FileType[]) =>
                              setFormData((prevState: any) => ({
                                ...prevState,
                                fileList: f,
                              }))
                            }
                            autoUpload={false}
                            className="mt-2"
                          >
                            <Button
                              style={{ background: "#1d3979", color: "white" }}
                            >
                              Select files...
                            </Button>
                          </Uploader>
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
                   style={{ width: "100px", marginBottom: "20px", color:"white", background:"#e33a32" }}
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

export default AirQuote;
