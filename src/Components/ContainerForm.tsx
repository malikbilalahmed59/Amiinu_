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
  SelectPicker,
} from "rsuite";

import FormControl from "../Pages/Quote/FormControl";

import { GiFireflake } from "react-icons/gi";
import { MdOutlineLocalFireDepartment } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";

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
  quantity: string ;
  weight_per_unit: string;
  hs_code: string;
  oversize: boolean;
  dangerous_goods: boolean;
  reefer: boolean;
  shipment: string;
}

interface ContainerFormProps {
  containerState: Container;
  handleContainerChange: (id: number, name: string, value: number | boolean | string) => void;
  // errors: Partial<Cargo>;
  handleContainerDelete: (id: number | string) => void;
}

const ContainerForm: React.FC<ContainerFormProps> = ({
  containerState,
  handleContainerChange,
  // errors,
  handleContainerDelete,
}) => {

  const [showContainerType, setShowContainerType] = useState(false)
 

  return (
    <>
      <FlexboxGrid.Item colspan={24} className="p-4 commidity-description">
        <Form fluid className="formCheck">
          <div className="d-flex justify-content-between align-items-start">
          <Heading level={6} className="container-1">
            Container # {containerState.id}
          </Heading>
          {  containerState.id !== 1 &&(
          <FaTrashAlt 
          size={20}
          onClick={()=> handleContainerDelete(containerState.id)}
            style={{ cursor: 'pointer', marginLeft: '10px', color: 'blue' }} 
          />
)        }
</div>
          <div className="input-field">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Commodity Description"
              value={containerState.description}

              onChange={(e) => handleContainerChange( containerState.id, "description", e.target.value)}
            />
            {/* {errors.deliveryAddress && (
              <small className="text-danger">{errors.deliveryAddress}</small>
            )} */}


          </div>
          <Form.Group controlId="type">
            <RadioGroup
              value={containerState.container_type}
              onChange={(value) => {
                if (value === "other") {
                  setShowContainerType(true);
                } else {
                  setShowContainerType(false);
                  handleContainerChange( containerState.id, "container_type", value);
                }
              }}
              className="radio-section"
              inline
              defaultValue="40"
            >
              <Radio value="40ST">40' Standard CNTR(S)</Radio>
              <Radio value="40HC">40' High Cube CNTR(S)</Radio>
              <Radio value="20ST">20' Standard CNTR(S)</Radio>
              <Radio value="other">Other</Radio>
            </RadioGroup>

            {/* {errors?.container_type && (

              <Form.HelpText className="text-danger">
                {errors?.container_type}
              </Form.HelpText>
            )} */}
            {showContainerType && (
              <Form.Group controlId="containerType">
                <Form.ControlLabel>Container Type</Form.ControlLabel>
                <SelectPicker
                  // {...register("container_type")}
                  data={
                    [
                      {
                        label: "20' FLAT RACK CNTR(S)",
                        value: "20FR",
                      },
                      {
                        label: "20' OPEN TOP CNTR(S)",
                        value: "20OT",
                      },
                      { label: "20' PLATFORM(S)", value: "20PL" },
                      { label: "20' REEFER(S)", value: "20RE" },
                      {
                        label: "40' HIGH CUBE REEFER(S)",
                        value: "40HR",
                      },
                      {
                        label: "40' FLAT RACK CNTR(S)",
                        value: "40FR",
                      },
                      { label: "40' REEFER(S)", value: "40RE" },
                      {
                        label: "40' OPEN TOP CNTR(S)",
                        value: "40OT",
                      },
                      { label: "40' PLATFORM(S)", value: "40PL" },
                    ]
                  }
                  searchable
                  className="w-100"
                  placeholder="Search by Location"
                  // {...register("container_type")}
                  name="container_type"
                  value={containerState.container_type}
                  onChange={(value: any) =>
                    handleContainerChange( containerState.id, "container_type", value)
                  }
                />

                {/* {errors?.container_type && (

                  <Form.HelpText className="text-danger">
                    {errors?.container_type}
                  </Form.HelpText>
                )} */}
              </Form.Group>
            )}
          </Form.Group>
          <>
            <div className="row">
              <div className="col-md-6">
                {" "}
                <>
                  <div className="input-field">
                    <Form.ControlLabel htmlFor="classDivision">
                      Quantity
                    </Form.ControlLabel>
                    <FormControl
                      type="number"
                      name="quantity"
                      placeholder="Enter quantity"
                      value={containerState.quantity}
                      onChange={(e) =>
                        handleContainerChange( containerState.id, "quantity", e)
                      }
                    />

                    {/* {errors?.quantity && (

                      <Form.HelpText className="text-danger">
                        {errors?.quantity}
                      </Form.HelpText>
                    )} */}
                  </div>
                </>
              </div>
              <div className="col-md-6">
                <>
                  <div className="input-field">
                    <Form.ControlLabel htmlFor="weightPerUnit">
                      Weight Per Unit
                    </Form.ControlLabel>
                    <FormControl
                      type="number"
                      name="WeightPerUnit"
                      placeholder="Enter weight per unit"
                      value={containerState.weight_per_unit}
                      onChange={(e) =>
                        handleContainerChange( containerState.id, "weight_per_unit", e)
                      }
                    />

                    {/* {errors?.weight_per_unit && (

                      <Form.HelpText className="text-danger">
                        {errors?.weight_per_unit}
                      </Form.HelpText>
                    )} */}
                  </div>
                </>
              </div>
            </div>
          </>
          <div className="input-field">
            <Form.ControlLabel htmlFor="hsCode" className="mt-2">
              Hs code
            </Form.ControlLabel>
            <input
              type="text"
              className="form-control mb-2"
              id="hsCode"
              name="hs_code"
              placeholder="Enter hs code"
              value={containerState.hs_code}

              onChange={(e) => handleContainerChange( containerState.id, "hs_code", e.target.value)}
            />
            {/* {errors?.hs_code && (

              <Form.HelpText className="text-danger">
                {errors?.hs_code}
              </Form.HelpText>
            )} */}
          </div>
          <Form.Group as={Panel} bordered className="p-0 mb-3">
          <Checkbox
          checked={containerState.oversize}
          onChange={() =>  handleContainerChange( containerState.id, "oversize", !containerState.oversize)}
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
                      handleContainerChange( containerState.id, "dangerous_goods", !containerState.dangerous_goods )
                    }}
                    checked={containerState.dangerous_goods}
                  ></Checkbox>
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
                  value={containerState.dangerous_good_details?.un_number ?? ""}
                  onChange={(e) =>
                    handleContainerChange( containerState.id, 
                      "dangerous_good_details.un_number",
                      e
                    )
                  }
                />
              </div>
              <div className="input-field">
                <FormControl
                  label="PROPER SHIPPING NAME*"
                  type="text"
                  
                  name="dangerous_good_details"
                  placeholder="Enter Proper Shipping Name"
                  value={
                    containerState.dangerous_good_details?.proper_shipping_name
                  }
                  onChange={(e) =>
                    handleContainerChange( containerState.id, 
                      "dangerous_good_details.proper_shipping_name",
                      e
                    )
                  }
                />
              </div>
              <div className="row mt-2">
                <div className="col-md-4">
                  {" "}
                  <Form.ControlLabel>CLASS/DIVISION</Form.ControlLabel>
                  <SelectPicker
                    data={[
                      { label: "N/A", value: "N/A" },
                      {
                        label:
                          "1.4 Substances and Articles which present no significant hazard",
                        value: "1.4",
                      },
                      {
                        label: "2.1 Flammable Gases",
                        value: "2.1",
                      },
                      {
                        label: "2.2 Non-flammable Non-Toxic Gas",
                        value: "2.2",
                      },
                      { label: "3 Flammable Liquids", value: "3" },
                      {
                        label: "4.1 Flammable Solids",
                        value: "4.1",
                      },
                      {
                        label: "4.2 Spontaneous Combustibles",
                        value: "4.2",
                      },
                      {
                        label: "4.3 Dangerous when wet",
                        value: "4.3",
                      },
                      {
                        label: "5.1 Oxidizing Agents",
                        value: "5.1",
                      },
                      {
                        label: "5.2 Organic Peroxides",
                        value: "5.2",
                      },
                      {
                        label: "6.1 Toxic Substances",
                        value: "6.1",
                      },
                      {
                        label: "8 Corrosive Substances",
                        value: "8",
                      },
                      {
                        label: "9 Miscellaneous Dangerous Goods",
                        value: "9",
                      },
                    ]}
                    searchable
                    className="w-100"
                    placeholder="Select a class/division"
                    name="class_division"
                    value={
                      containerState.dangerous_good_details?.class_division
                    }
                    onChange={(value: any) =>
                      handleContainerChange( containerState.id, 
                        "dangerous_good_details.class_division",
                        value
                      )
                    }
                  />
                </div>
                <div className="col-md-8">
                  {" "}
                  <div className="input-field">
                    <FormControl
                      label="SUBDIVISION*"
                      type="text"
                      name="subdivision"
                      placeholder="Enter Subdivision"
                      value={containerState.dangerous_good_details.subdivision}
                      onChange={(e) =>
                        handleContainerChange( containerState.id, 
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
                  {" "}
                  <Form.ControlLabel>PACKAGING GROUP</Form.ControlLabel>
                  <SelectPicker
                    data={[
                      { label: "N/A", value: "N/A" },
                      { label: "I", value: "I" },
                      { label: "II", value: "II" },
                      { label: "III", value: "III" },
                    ]}
                    searchable
                    className="w-100"
                    placeholder="Select a packaging group"
                    // {...register("packaging_group")}
                    name="packaging_group"
                    value={
                      containerState.dangerous_good_details?.packaging_group
                    }

                    onChange={(value: any) =>
                      handleContainerChange( containerState.id, 
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
                        handleContainerChange( containerState.id, 
                          "dangerous_good_details.packaging_instructions",
                          e
                        )
                      }
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
                        handleContainerChange( containerState.id, 
                          "dangerous_good_details.DangeriousQuantity",
                          e
                        )
                      }
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
                        handleContainerChange( containerState.id, 
                          "dangerous_good_details.total_net_quantity",
                          e
                        )
                      }
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
                        handleContainerChange( containerState.id, 
                          "dangerous_good_details.type_of_packing",
                          e
                        )
                      }
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
                      value={
                        containerState.dangerous_good_details?.authorization
                      }
                      onChange={(e) =>
                        handleContainerChange( containerState.id, 
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
                        handleContainerChange( containerState.id, "reefer", !containerState.reefer )
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
                        value={containerState.reefer_details?.temperature ?? ""}
                        onChange={(e) =>
                          handleContainerChange( containerState.id, 
                            "reefer_details.temperature",
                            e
                          )
                        }
                      />

                      {/* {errors?.temperature && (

                        <span className="text-danger">
                          {errors?.temperature}
                        </span>
                      )} */}
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="input-field">
                      <FormControl
                        label="VENTILATION FIELD (%)"
                        type="number"
                        name="ventilation"
                        placeholder="E.g. 1002"
                        value={containerState?.reefer_details?.ventilation ?? ""}
                        onChange={(e) =>
                          handleContainerChange( containerState.id, 
                            "reefer_details.ventilation",
                            e
                          )
                        }
                      />

                      {/* {errors?.reefer_details?.ventilation && (

                        <span className="text-danger">
                          {errors?.reefer_details.ventilation}
                        </span>
                      )} */}
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="input-field">
                      <FormControl
                        label="   HUMIDITY (%)"
                        type="number"
                        name="humidity"
                        placeholder="E.g. 1002"
                        value={containerState.reefer_details?.humidity ?? ""}
                        onChange={(e) =>
                          handleContainerChange( containerState.id, 
                            "reefer_details.humidity",
                            e
                          )
                        }
                      />

                      {/* {errors?.reefer_details?.humidity && (

                        <span className="text-danger">
                          {errors.reefer_details.humidity}
                        </span>
                      )} */}
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
