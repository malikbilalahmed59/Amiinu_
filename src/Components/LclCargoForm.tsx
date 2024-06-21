import React from "react";
import {
  Accordion,
  Checkbox,
  Form,
  Input,
  InputGroup,
  Message,
  Panel,
} from "rsuite";
import FormControl from "../Pages/Quote/FormControl";
import { CargoFormProps } from "../services/types";
import CustomSelectPicker from "./SelectPicker";
import { typeChoices } from "../data/data";
import { CgMathPlus } from "react-icons/cg";
import { RiEqualFill } from "react-icons/ri";
import { FaFireAlt } from "react-icons/fa";
import { divisionList } from "../data/data";
import { FaTrashAlt } from "react-icons/fa";
import { HiCircleStack } from "react-icons/hi2";

const LclCargoForm: React.FC<CargoFormProps> = ({
  cargoState,
  handleCargoChange,
  handleCargoDelete,
  index,
  errors,
}) => {
  const handleChange = (name: string, value: any) => {
    handleCargoChange(cargoState.id, name, value);
  };
  return (
    <>
      <div className="bottom-section my-3">
        <div className="d-flex align-items-center justify-content-between bottom-title">
          <span>Cargo # {cargoState.id}</span>
          {cargoState.id !== 1 && (
            <FaTrashAlt
              size={20}
              onClick={() => handleCargoDelete(cargoState.id)}
              style={{ cursor: "pointer", marginLeft: "10px", color: "blue" }}
            />
          )}
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
            error={errors[`cargo_${index}_comiditydiscription`]}
          />
        </div>
        <div className="commidity-div mt-3">
          <div className="row testtt align-items-center">
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
                error={errors[`cargo_${index}_quantity`]}
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
                error={errors[`cargo_${index}_packages`]}
              />
            </div>
            <div className="col-md-1 pt-3">
              <CgMathPlus size={"18px"} style={{ rotate: "45deg" }} />
            </div>
            <div className="col-md-2">
              <FormControl
                label="W (KG)"
                name="weight"
                placeholder=""
                value={cargoState.weight}
                onChange={(e: any) => {
                  handleChange("weight", e);
                }}
                error={errors[`cargo_${index}_weight`]}
              />
            </div>
            <div className="col-md-1 pt-3">
              <RiEqualFill size={"18px"} />
            </div>
            <div className="col-md-3">
              <FormControl
                label="TOTAL"
                name="total quantity"
                placeholder="Total"
                value={
                  cargoState.weight && cargoState.quantity
                    ? (
                        parseInt(cargoState.weight) *
                        parseInt(cargoState.quantity)
                      ).toString()
                    : ""
                }
                error={""}
                onChange={() => {}}
              />
            </div>
          </div>
          <div className="row secondCalculation align-items-center">
            <div className="col-md-3">
              <FormControl
                label="L (CM)*"
                name="lcm"
                placeholder=""
                value={cargoState.lcm}
                onChange={(e: any) => {
                  handleChange("lcm", e);
                }}
                error={errors[`cargo_${index}_lcm`]}
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
                error={errors[`cargo_${index}_wcm`]}
              />
            </div>
            <div className="col-md-1 pt-3">
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
                error={errors[`cargo_${index}_hcm`]}
              />
            </div>
            <div className="col-md-1 pt-3">
              <RiEqualFill size={"18px"} />
            </div>
            <div className="col-md-3">
              <FormControl
                label="TOTAL"
                name=""
                placeholder=""
                value={
                  cargoState.hcm && cargoState.wcm && cargoState.lcm
                    ? (
                        parseInt(cargoState.hcm) *
                        parseInt(cargoState.wcm) *
                        parseInt(cargoState.lcm)
                      ).toString()
                    : ""
                }
                onChange={() => {}}
              />
            </div>
          </div>

          <div className="row mt-2">
            <div className="col-md-12">
              <FormControl
                label="HS CODE"
                placeholder="6 characters"
                name="code_character"
                value={cargoState.code_character}
                onChange={(e: any) => {
                  handleChange("code_character", e);
                }}
                error={errors[`cargo_${index}_code_character`]}
              />
            </div>
          </div>
          <div className="row pt-3">
            <div className="col-md-12">
              <Form.Group>
                <Form.Group as={Panel} bordered className="p-0 mb-3">
                  <Checkbox
                    checked={cargoState.non_stackable ?? false}
                    onChange={() => {
                      handleChange("non_stackable", !cargoState.non_stackable);
                    }}
                  >
                   

                    <HiCircleStack  size={20}  color={cargoState.non_stackable ? '#1d73ff' : '#102951'} />
                          <span style={{ color: cargoState.non_stackable? '#1d73ff' : '#171725', paddingLeft:"5px" }}>
                          Non Stackable
      </span>
                  </Checkbox>
                </Form.Group>
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
                          <FaFireAlt size={20}  color={cargoState.dangerous_good ? '#1d73ff' : '#102951'} />
                          <span style={{ color: cargoState.dangerous_good ? '#1d73ff' : '#171725', paddingLeft:"5px" }}>
        Dangerous Goods
      </span>
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
                        error={errors[`cargo_${index}_un_number`]}
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
                        error={errors[`cargo_${index}_proper_shipping_name`]}
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
                            error={errors[`cargo_${index}_class_division`]}
                            placeholder="Select a class/division"
                          />
                        </div>

                        <div className="col-md-6">
                          <FormControl
                            label="SUBDIVISION"
                            placeholder="Type somethings ...."
                            name="subdivision"
                            error={errors[`cargo_${index}_subdivision`]}
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
                            error={errors[`cargo_${index}_packaging_group`]}
                          />
                        </div>

                        <div className="col-md-6">
                          <FormControl
                            label="PACKAGING INSTRUCTIONS*"
                            placeholder="Type somethings ...."
                            name="packageinstruction"
                            error={
                              errors[`cargo_${index}_packaging_instructions`]
                            }
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
                          <Form.Group>
                            <Form.ControlLabel>QUANTITY</Form.ControlLabel>
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
                            <Form.HelpText className="text-danger">
                              {errors[`cargo_${index}_DangeriousQuantity`]}
                            </Form.HelpText>
                          </Form.Group>
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
                            error={errors[`cargo_${index}_total_net_quantity`]}
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
                            error={errors[`cargo_${index}_type_of_packing`]}
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
                            error={errors[`cargo_${index}_authorization`]}
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

export default LclCargoForm;
