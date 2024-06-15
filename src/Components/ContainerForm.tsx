import React, { useState } from "react";
import {
  Accordion,
  Checkbox,
  FlexboxGrid,
  Form,
  Heading,
  Message,
  Panel,
  Radio,
  RadioGroup,
} from "rsuite";

import FormControl from "../Pages/Quote/FormControl";

import { FaTrashAlt } from "react-icons/fa";
import { GiFireflake } from "react-icons/gi";
import { MdOutlineLocalFireDepartment } from "react-icons/md";
import { containerTypeList, divisionList } from "../data/data";
import CustomSelectPicker from "./SelectPicker";

interface Container {
  id: number;
  dangerous_good_details: {
    un_number: string | null;
    proper_shipping_name: string;
    class_division: string;
    subdivision: string;
    packaging_group: string;
    packaging_instructions: string;
    DangeriousQuantity: string | null;
    total_net_quantity: string | null;
    type_of_packing: string;
    authorization: string;
  };
  reefer_details: {
    temperature: string | null;
    ventilation: string | null;
    humidity: string | null;
  };
  description: string;
  container_type: string;
  quantity: string;
  weight_per_unit: string;
  hs_code: string;
  oversize: boolean;
  dangerous_goods: boolean;
  reefer: boolean;
  shipment: string;
}

interface ContainerFormProps {
  containerState: Container;
  handleContainerChange: (
    id: number,
    name: string,
    value: number | boolean | string
  ) => void;
  errors: any;
  index: number;
  handleContainerDelete: (id: number | string) => void;
}

const ContainerForm: React.FC<ContainerFormProps> = ({
  containerState,
  handleContainerChange,
  errors,
  index,
  handleContainerDelete,
}) => {
  const [showContainerType, setShowContainerType] = useState(false);
  console.log(index);
  return (
    <>
      <FlexboxGrid.Item colspan={24} className="p-4 commidity-description">
        <Form fluid className="formCheck">
          <div className="d-flex justify-content-between align-items-start">
            <Heading level={6} className="container-1">
              Container # {containerState.id}
            </Heading>
            {containerState.id !== 1 && (
              <FaTrashAlt
                size={20}
                onClick={() => handleContainerDelete(containerState.id)}
                style={{ cursor: "pointer", marginLeft: "10px", color: "blue" }}
              />
            )}
          </div>
          <div className="input-field">
            <FormControl
              name=""
              label="Commodity Description"
              placeholder="Enter Commodity Description"
              value={containerState.description}
              error={errors[`container_${index}_description`]}
              onChange={(e) =>
                handleContainerChange(containerState.id, "description", e)
              }
            />
          </div>
          <Form.Group controlId="type">
            <Form.ControlLabel>Container Type</Form.ControlLabel>
            <RadioGroup
              value={containerState.container_type}
              onChange={(value) => {
                if (value === "other") {
                  setShowContainerType(true);
                } else {
                  setShowContainerType(false);
                  handleContainerChange(
                    containerState.id,
                    "container_type",
                    value
                  );
                }
              }}
              className="radio-section"
              inline
              defaultValue="40ST"
            >
              <Radio value="40ST">40' Standard CNTR(S)</Radio>
              <Radio value="40HC">40' High Cube CNTR(S)</Radio>
              <Radio value="20ST">20' Standard CNTR(S)</Radio>
              <Radio value="other">Other</Radio>
            </RadioGroup>
            {errors[`container_${index}_container_type`] && (
              <Form.HelpText className="text-danger">
                {errors[`container${index}_container_type`]}
              </Form.HelpText>
            )}
            {showContainerType && (
              <CustomSelectPicker
                label="Container Type"
                data={containerTypeList}
                placeholder="Select type"
                name="container_type"
                error={errors[`container${index}_container_type`]}
                value={containerState.container_type}
                onChange={(value: any) =>
                  handleContainerChange(
                    containerState.id,
                    "container_type",
                    value
                  )
                }
              />
            )}
          </Form.Group>
          <>
            <div className="row">
              <div className="col-md-6">
                <div className="input-field">
                  <FormControl
                    label="Quantity"
                    type="number"
                    name="quantity"
                    placeholder="Enter quantity"
                    value={containerState.quantity}
                    error={errors[`container_${index}_quantity`]}
                    onChange={(e) =>
                      handleContainerChange(containerState.id, "quantity", e)
                    }
                  />
                </div>
              </div>
              <div className="col-md-6">
                <>
                  <div className="input-field">
                    <FormControl
                      label="Weight Per Unit"
                      type="number"
                      error={errors[`container_${index}_weight_per_unit`]}
                      name="WeightPerUnit"
                      placeholder="Enter weight per unit"
                      value={containerState.weight_per_unit}
                      onChange={(e) =>
                        handleContainerChange(
                          containerState.id,
                          "weight_per_unit",
                          e
                        )
                      }
                    />
                  </div>
                </>
              </div>
            </div>
          </>
          <div className="input-field">
            <FormControl
              label="Hs code"
              type="text"
              name="hs_code"
              placeholder="Enter hs code"
              error={errors[`container_${index}_hs_code`]}
              value={containerState.hs_code}
              onChange={(e) =>
                handleContainerChange(containerState.id, "hs_code", e)
              }
            />
          </div>
          <Form.Group as={Panel} bordered className="p-0 mb-3">
            <Checkbox
              checked={containerState.oversize}
              onChange={() =>
                handleContainerChange(
                  containerState.id,
                  "oversize",
                  !containerState.oversize
                )
              }
            >
              Oversized
            </Checkbox>
          </Form.Group>

          <Accordion
            onClick={(e: any) => e.preventDefault()}
            bordered
            className="mb-3"
          >
            <Accordion.Panel
              expanded={containerState.dangerous_goods}
              header={
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Checkbox
                    onClick={(e) => {
                      e.stopPropagation();
                      handleContainerChange(
                        containerState.id,
                        "dangerous_goods",
                        !containerState.dangerous_goods
                      );
                    }}
                    checked={containerState.dangerous_goods}
                  />
                  <MdOutlineLocalFireDepartment size={20} />
                  <span style={{ marginLeft: "8px" }}>Dangerous Goods</span>
                </div>
              }
            >
              <Message showIcon type="warning" className="mb-3">
                <strong>
                  Submission of DG Declaration, SDS and any "authorization
                  letters" pertaining to the shipment is the MANDATORY.
                </strong>
              </Message>

              <div className="input-field mb-2">
                <FormControl
                  label="UN NUMBER*"
                  type="number"
                  name="un_number"
                  placeholder="Enter UN Number"
                  error={errors[`container_${index}_un_number`]}
                  value={containerState.dangerous_good_details?.un_number ?? ""}
                  onChange={(e) =>
                    handleContainerChange(
                      containerState.id,
                      "dangerous_good_details.un_number",
                      e
                    )
                  }
                />
              </div>
              <div className="input-field">
                <FormControl
                  label="PROPER SHIPPING NAME*"
                  error={errors[`container_${index}_proper_shipping_name`]}
                  name="dangerous_good_details"
                  placeholder="Enter Proper Shipping Name"
                  value={
                    containerState.dangerous_good_details?.proper_shipping_name
                  }
                  onChange={(e) =>
                    handleContainerChange(
                      containerState.id,
                      "dangerous_good_details.proper_shipping_name",
                      e
                    )
                  }
                />
              </div>
              <div className="row mt-2">
                <div className="col-md-4">
                  <CustomSelectPicker
                    label="CLASS/DIVISION"
                    data={divisionList}
                    placeholder="Select a class/division"
                    name="class_division"
                    error={errors[`container_${index}_class_division`]}
                    value={
                      containerState.dangerous_good_details?.class_division
                    }
                    onChange={(value: any) =>
                      handleContainerChange(
                        containerState.id,
                        "dangerous_good_details.class_division",
                        value
                      )
                    }
                  />
                </div>
                <div className="col-md-8">
                  <div className="input-field">
                    <FormControl
                      label="SUBDIVISION*"
                      type="text"
                      name="subdivision"
                      placeholder="Enter Subdivision"
                      error={errors[`container_${index}_subdivision`]}
                      value={containerState.dangerous_good_details.subdivision}
                      onChange={(e) =>
                        handleContainerChange(
                          containerState.id,
                          "dangerous_good_details.subdivision",
                          e
                        )
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="row mt-2">
                <div className="col-md-4">
                  <CustomSelectPicker
                    label="PACKAGING GROUP"
                    data={[
                      { label: "N/A", value: "N/A" },
                      { label: "I", value: "I" },
                      { label: "II", value: "II" },
                      { label: "III", value: "III" },
                    ]}
                    placeholder="Select a packaging group"
                    name="packaging_group"
                    value={
                      containerState.dangerous_good_details?.packaging_group
                    }
                    error={errors[`container_${index}_packaging_group`]}
                    onChange={(value: any) =>
                      handleContainerChange(
                        containerState.id,
                        "dangerous_good_details.packaging_group",
                        value
                      )
                    }
                  />
                </div>
                <div className="col-md-8">
                  <div className="input-field">
                    <FormControl
                      label=" PACKAGING INSTRUCTIONS*"
                      type="text"
                      name="dangerous_good_details.packaging_instructions"
                      placeholder="Enter Packaging Instructions"
                      value={
                        containerState.dangerous_good_details
                          ?.packaging_instructions
                      }
                      onChange={(e) =>
                        handleContainerChange(
                          containerState.id,
                          "dangerous_good_details.packaging_instructions",
                          e
                        )
                      }
                      error={errors[`container_${index}_packaging_group`]}
                    />
                  </div>
                </div>
              </div>

              <div className="row mt-2">
                <div className="col-md-4">
                  {" "}
                  <div className="input-field">
                    <FormControl
                      label="QUANTITY"
                      type="number"
                      name="DangeriousQuantity"
                      placeholder="Enter quantity"
                      value={
                        containerState.dangerous_good_details
                          ?.DangeriousQuantity ?? ""
                      }
                      onChange={(e) =>
                        handleContainerChange(
                          containerState.id,
                          "dangerous_good_details.DangeriousQuantity",
                          e
                        )
                      }
                      error={errors[`container_${index}_packaging_group`]}
                    />
                  </div>
                </div>
                <div className="col-md-8">
                  <div className="input-field">
                    <FormControl
                      label=" TOTAL NET QUANTITY"
                      type="number"
                      name="dangerous_good_details.total_net_quantity"
                      placeholder="Enter Total Net Quantity"
                      value={
                        containerState.dangerous_good_details
                          ?.total_net_quantity ?? ""
                      }
                      onChange={(e) =>
                        handleContainerChange(
                          containerState.id,
                          "dangerous_good_details.total_net_quantity",
                          e
                        )
                      }
                      error={errors[`container_${index}_packaging_group`]}
                    />
                  </div>
                </div>
              </div>

              <div className="row mt-2">
                <div className="col-md-12">
                  <div className="input-field">
                    <FormControl
                      label=" TYPE OF PACKING"
                      type="text"
                      name="dangerous_good_details.type_of_packing"
                      placeholder="Enter Type of Packing"
                      value={
                        containerState.dangerous_good_details?.type_of_packing
                      }
                      onChange={(e) =>
                        handleContainerChange(
                          containerState.id,
                          "dangerous_good_details.type_of_packing",
                          e
                        )
                      }
                      error={errors[`container_${index}_packaging_group`]}
                    />
                  </div>
                </div>
              </div>

              <div className="row mt-2">
                <div className="col-md-12">
                  <div className="input-field">
                    <FormControl
                      label="AUTHORIZATION"
                      type="text"
                      name="dangerous_good_details.authorization"
                      placeholder="Enter Authorization"
                      error={errors[`container_${index}_authorization`]}
                      value={
                        containerState.dangerous_good_details?.authorization
                      }
                      onChange={(e) =>
                        handleContainerChange(
                          containerState.id,
                          "dangerous_good_details.authorization",
                          e
                        )
                      }
                    />
                  </div>
                </div>
              </div>
            </Accordion.Panel>
          </Accordion>
          <Form.Group>
            <Accordion bordered onClick={(e: any) => e.preventDefault()}>
              <Accordion.Panel
                expanded={containerState.reefer}
                header={
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Checkbox
                      onClick={(e) => {
                        e.stopPropagation();
                        handleContainerChange(
                          containerState.id,
                          "reefer",
                          !containerState.reefer
                        );
                      }}
                      checked={containerState.reefer}
                    ></Checkbox>
                    <GiFireflake size={20} />
                    <span style={{ marginLeft: "8px" }}>Reefer</span>
                  </div>
                }
              >
                <div className="row">
                  <div className="col-md-4">
                    <div className="input-field">
                      <FormControl
                        label="TEMPERATURE (C)"
                        type="number"
                        name="temperature"
                        placeholder="E.g. 1002"
                        error={errors[`container_${index}_temperature`]}
                        value={containerState.reefer_details?.temperature ?? ""}
                        onChange={(e) =>
                          handleContainerChange(
                            containerState.id,
                            "reefer_details.temperature",
                            e
                          )
                        }
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="input-field">
                      <FormControl
                        label="VENTILATION FIELD (%)"
                        type="number"
                        name="ventilation"
                        placeholder="E.g. 1002"
                        value={
                          containerState?.reefer_details?.ventilation ?? ""
                        }
                        error={errors[`container_${index}_ventilation`]}
                        onChange={(e) =>
                          handleContainerChange(
                            containerState.id,
                            "reefer_details.ventilation",
                            e
                          )
                        }
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="input-field">
                      <FormControl
                        label="   HUMIDITY (%)"
                        type="number"
                        name="humidity"
                        placeholder="E.g. 1002"
                        error={errors[`container_${index}_humidity`]}
                        value={containerState.reefer_details?.humidity ?? ""}
                        onChange={(e) =>
                          handleContainerChange(
                            containerState.id,
                            "reefer_details.humidity",
                            e
                          )
                        }
                      />
                    </div>
                  </div>
                </div>
              </Accordion.Panel>
            </Accordion>
          </Form.Group>
        </Form>
      </FlexboxGrid.Item>
    </>
  );
};

export default ContainerForm;
