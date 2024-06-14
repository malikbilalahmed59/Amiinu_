import React from "react";
import {
  Accordion,
  Checkbox,
  Form,
  Input,
  InputGroup,
  Message,
} from "rsuite";
import FormControl from "../Pages/Quote/FormControl";
import { CargoFormProps } from "../services/types";
import CustomSelectPicker from "./SelectPicker";
import { typeChoices } from "../data/data";
import { CgMathPlus } from "react-icons/cg";
import { RiEqualFill } from "react-icons/ri";
import { MdOutlineLocalFireDepartment } from "react-icons/md";
import { FaFireAlt } from "react-icons/fa";
import { divisionList } from "../data/data";
import { FaTrashAlt } from "react-icons/fa";

const CargoForm: React.FC<CargoFormProps> = ({
  cargoState,
  handleCargoChange,
  handleCargoDelete
}) => {
  const handleChange = (name: string, value: any) => {
    handleCargoChange(cargoState.id, name, value);
  };
  return (
    <>
      <div className="bottom-section my-3">
        <div className="d-flex align-items-center justify-content-between bottom-title">
          <span>Cargo # {cargoState.id}</span>
          { cargoState.id !== 1 &&(
          <FaTrashAlt 
          size={20}
          onClick={()=> handleCargoDelete(cargoState.id)}
            style={{ cursor: 'pointer', marginLeft: '10px', color: 'blue' }} 
          />
)        }
        </div>
        <div className="commidity-div mt-3">
          <FormControl
            label="COMMODITY DESCRIPTION*"
            name="comiditydiscription"
            placeholder="Search by Location"
            value={cargoState.comiditydiscription}
            onChange={(e: any) => {
              handleChange("comiditydiscription", e);
            }}
          />
        </div>
        <div className="commidity-div mt-3">
          <div className="row testtt">
            <div className="col-md-3">
              <FormControl
                label="Quantity"
                type="number"
                name="quantity"
                placeholder="Quantity"
                value={cargoState.quantity}
                onChange={(e: any) => {
                  handleChange("quantity", e);
                }}
              />
            </div>
            <div className="col-md-2">
              <CustomSelectPicker
                label="Type"
                data={typeChoices}
                name="packages"
                placeholder="Package"
                value={cargoState.packages}
                onChange={(e: any) => {
                  handleChange("packages", e);
                }}
              />
            </div>
            <div className="col-md-1">
              <CgMathPlus size={"18px"} style={{ rotate: "45deg" }} />
            </div>
            <div className="col-md-2">
              <FormControl
                label="   W (KG)"
                name="weight"
                placeholder=""
                value={cargoState.weight}
                   onChange={(e: any) => {
                  handleChange("weight", e);
                }}
              />
            </div>
            <div className="col-md-1">
              <RiEqualFill size={"18px"} />
            </div>
            <div className="col-md-3">
              <FormControl
                label=" TOTAL"
                name=""
                placeholder=""
                value={cargoState.weight && cargoState.quantity ? (parseInt(cargoState.weight) * parseInt(cargoState.quantity)).toString() : "" }
                onChange={()=> {}}
              />
            </div>
          </div>
          <div className="row secondCalculation">
            <div className="col-md-3">
              <FormControl
                label="L (CM)*"
                name="lcm"
                placeholder=""
                value={cargoState.lcm}
                onChange={(e: any) => {
                  handleChange("lcm", e);
                }}
              />
            </div>
            <div className="col-md-2">
              <FormControl
                label=" W (CM)"
                name="wcm"
                placeholder=""
                value={cargoState.wcm}
                onChange={(e: any) => {
                  handleChange("wcm", e);
                }}
              />
            </div>
            <div className="col-md-1">
              <CgMathPlus size={"18px"} style={{ rotate: "45deg" }} />
            </div>
            <div className="col-md-2">
              <FormControl
                label=" H (CM)"
                name="hcm"
                placeholder=""
                value={cargoState.hcm}
                onChange={(e: any) => {
                  handleChange("hcm", e);
                }}
              />
            </div>
            <div className="col-md-1">
              <RiEqualFill size={"18px"} />
            </div>
            <div className="col-md-3">
              <Form.ControlLabel className="to">TOTAL</Form.ControlLabel>

              <FormControl
                name=""
                placeholder=""
                value={cargoState.hcm && cargoState.wcm && cargoState.lcm ? (parseInt(cargoState.hcm) * parseInt(cargoState.wcm) * parseInt(cargoState.lcm)).toString() : ""}
             onChange={()=>{}}
              />
            </div>
          </div>

          <div className="row mt-2">
            <div className="col-md-4">
              <FormControl
                label="VOLUMETRIC WEIGHT"
                placeholder=""
                name="v_weight"
                value={cargoState.v_weight}
                onChange={(e: any) => {
                  handleChange("v_weight", e);
                }}
              />
            </div>
            <div className="col-md-8">
              <FormControl
                label="HS CODE"
                placeholder="6 characters"
                name="code_character"
                value={cargoState.code_character}
                onChange={(e: any) => {
                  handleChange("code_character", e);
                }}
              />
            </div>
          </div>
          <div className="row pt-3">
            <div className="col-md-12">
              <Form.Group>
                <Accordion
                  bordered
                  onClick={(e: any) => {
                    e.preventDefault();
                    if (
                      e.target.tagName === "INPUT" ||
                      e.target.tagName === "TEXTAREA" ||
                      e.target.tagName === "SELECT" ||
                      e.target.tagName === "BUTTON"
                    ) {
                      return;
                    }
                    console.log("Parent click");
                    handleChange("tempearture", !cargoState.tempearture);
                  }}
                >
                  <Accordion.Panel
                    expanded={cargoState.tempearture}
                    header={
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <Checkbox
                            className="pr-2"
                            checked={cargoState.tempearture}
                            onClick={() => {
                              console.log("chil click");

                              handleChange(
                                "tempearture",
                                !cargoState.tempearture
                              );
                            }}
                          />
                          <MdOutlineLocalFireDepartment size={20} />
                          Temperature controlled
                        </div>
                      </div>
                    }
                  >
                    <div className="row" onClick={(e) => e.stopPropagation()}>
                      <div className="col-md-6">
                        <label className="pb-2">TEMPERATURE MIN (°C)</label>
                        <InputGroup>
                          <InputGroup.Button>+</InputGroup.Button>
                          <Input
                            name="temperature_min"
                            value={cargoState.temperature_details.min}
                            onChange={(e: any) => {
                              handleChange("temperature_details.min", e);
                            }}
                          />
                          <InputGroup.Button>-</InputGroup.Button>
                        </InputGroup>
                      </div>
                      <div className="col-md-6">
                        <label className="pb-2">TEMPERATURE MAX (°C)</label>
                        <InputGroup>
                          <InputGroup.Button>+</InputGroup.Button>
                          <Input
                            name="temperature_max"
                            value={cargoState.temperature_details.max}
                            onChange={(e: any) => {
                              handleChange("temperature_details.max", e);
                            }}
                          />
                          <InputGroup.Button>-</InputGroup.Button>
                        </InputGroup>
                      </div>
                    </div>
                  </Accordion.Panel>
                </Accordion>
                <Accordion
                  bordered
                  className="mt-2"
                  onClick={(e: any) => {
                    e.preventDefault();

                    handleChange("dangerous_good", !cargoState.dangerous_good);
                  }}
                >
                  <Accordion.Panel
                    header={
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <Checkbox
                            className="pr-2"
                            checked={cargoState.dangerous_good}
                            onClick={(e: any) => {
                              e.preventDefault();
                              handleChange(
                                "dangerous_good",
                                !cargoState.dangerous_good
                              );
                            }}
                          />
                          <FaFireAlt size={20} />
                          Dangerous Goods
                        </div>
                      </div>
                    }
                  >
                    <div onClick={(e) => e.stopPropagation()}>
                      <Message showIcon type="warning" className="mb-2">
                        <strong>
                          Submission of DG Declaration, SDS and any
                          "authorization letters" pertaining to the shipment is
                          the MANDATORY.
                        </strong>
                      </Message>

                      <FormControl
                        label="UN NUMBER"
                        placeholder="E.g. 1002"
                        name="un_number"
                        type="number"
                        value={
                          cargoState.dangerous_good_details.un_number != null
                            ? cargoState.dangerous_good_details.un_number.toString()
                            : ""
                        }
                        onChange={(e: any) => {
                          handleChange("dangerous_good_details.un_number", e);
                        }}
                      />
                      <FormControl
                        label="PROPER SHIPPING NAME"
                        placeholder="Type somethings ...."
                        name="proper_shipping_name"
                        value={
                          cargoState.dangerous_good_details.proper_shipping_name
                        }
                        onChange={(e: any) => {
                          handleChange(
                            "dangerous_good_details.proper_shipping_name",
                            e
                          );
                        }}
                      />
                      <div className="row">
                        <div className="col-md-6">
                          <CustomSelectPicker
                            value={
                              cargoState.dangerous_good_details.class_division
                            }
                            label="CLASS/DIVISION"
                            name="class_division"
                            data={divisionList}
                            onChange={(e) => {
                              handleChange(
                                "dangerous_good_details.class_division",
                                e
                              );
                            }}
                            placeholder="Select a class/division"
                          />
                        </div>

                        <div className="col-md-6">
                          <FormControl
                            label="SUBDIVISION"
                            placeholder="Type somethings ...."
                            name="subdivision"
                            value={
                              cargoState.dangerous_good_details.subdivision
                            }
                            onChange={(e) => {
                              handleChange(
                                "dangerous_good_details.subdivision",
                                e
                              );
                            }}
                          />
                        </div>
                      </div>
                      <div className="row pt-3">
                        <div className="col-md-6">
                          <CustomSelectPicker
                            name=""
                            label="Package/division"
                            data={[
                              { label: "N/A", value: "N/A" },
                              { label: "I", value: "I" },
                              { label: "II", value: "II" },
                              { label: "III", value: "III" },
                            ]}
                            placeholder="Select a Package/division"
                            value={
                              cargoState.dangerous_good_details.packaging_group
                            }
                            onChange={(e) => {
                              handleChange(
                                "dangerous_good_details.packaging_group",
                                e
                              );
                            }}
                          />
                        </div>

                        <div className="col-md-6">
                          <FormControl
                            label="PACKAGING INSTRUCTIONS*"
                            placeholder="Type somethings ...."
                            name="packageinstruction"
                            value={
                              cargoState.dangerous_good_details
                                .packaging_instructions
                            }
                            onChange={(e) => {
                              handleChange(
                                "dangerous_good_details.packaging_instructions",
                                e
                              );
                            }}
                          />
                        </div>
                      </div>

                      <div className="row mt-3">
                        <div className="col-md-6">
                          <span>QUANTITY</span>
                          <InputGroup>
                            <InputGroup.Button>+</InputGroup.Button>
                            <Input
                              placeholder=""
                              name="DangeriousQuantity"
                              value={
                                cargoState.dangerous_good_details
                                  .DangeriousQuantity != null
                                  ? cargoState.dangerous_good_details.DangeriousQuantity.toString()
                                  : ""
                              }
                              onChange={(e) => {
                                handleChange(
                                  "dangerous_good_details.DangeriousQuantity",
                                  e
                                );
                              }}
                            />
                            <InputGroup.Button>-</InputGroup.Button>
                          </InputGroup>
                        </div>
                        <div className="col-md-6">
                          <FormControl
                            label="TOTAL NET QUANTITY*
"
                            placeholder="Type somethings ...."
                            name="totalquantity"
                            value={
                              cargoState.dangerous_good_details
                                .total_net_quantity != null
                                ? cargoState.dangerous_good_details.total_net_quantity.toString()
                                : ""
                            }
                            onChange={(e) => {
                              handleChange(
                                "dangerous_good_details.total_net_quantity",
                                e
                              );
                            }}
                          />
                        </div>
                      </div>

                      <div className="row mt-3">
                        <div className="col-md-12">
                          <FormControl
                            label="TYPE OF PACKING*"
                            placeholder="Type somethings ...."
                            name="packingtype"
                            value={
                              cargoState.dangerous_good_details.type_of_packing
                            }
                            onChange={(e) => {
                              handleChange(
                                "dangerous_good_details.type_of_packing",
                                e
                              );
                            }}
                          />
                        </div>
                      </div>
                      <div className="row mt-3">
                        <div className="col-md-12">
                          <FormControl
                            label="AUTHORIZATION*"
                            placeholder="Type somethings ...."
                            name="authorizing"
                            value={
                              cargoState.dangerous_good_details.authorization
                            }
                            onChange={(e) => {
                              handleChange(
                                "dangerous_good_details.authorization",
                                e
                              );
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </Accordion.Panel>
                </Accordion>
              </Form.Group>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CargoForm;