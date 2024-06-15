import { FcInfo } from "react-icons/fc";
import { PiDiamondsFourLight, PiHandArrowDownLight } from "react-icons/pi";
import { Button, Col, FlexboxGrid, Panel, Stack, Text } from "rsuite";
import "./Dashboard.css";
const Dashboard = () => {
  const options = [
    {
      Icon: PiHandArrowDownLight,
      count: 10,
      title: "Booking Created.",
    },
    {
      Icon: PiHandArrowDownLight,
      count: 10,
      title: "Booking Confirmation.",
    },
    {
      Icon: PiHandArrowDownLight,
      count: 10,
      title: "In transit from shipper",
    },
    {
      Icon: PiHandArrowDownLight,
      count: 10,
      title: "On Hand At Origin",
    },
    {
      Icon: PiHandArrowDownLight,
      count: 10,
      title: "In transit",
    },
    {
      Icon: PiHandArrowDownLight,
      count: 10,
      title: "On Hand At Destination",
    },
    {
      Icon: PiHandArrowDownLight,
      count: 10,
      title: "Out of Delivery",
    },
    {
      Icon: PiHandArrowDownLight,
      count: 10,
      title: "Delivered",
    },
  ];
  return (
    <div className="firstBoxs container">
      <>
        <div className="row">
          <div className="mb-2 col-md-8">
            <Panel bordered>
              <Stack className="mb-2 ms-2 stack-text">
                <Text size="lg" className="me-2 stack-text" weight="bold">
                  Track
                </Text>
                <Text className="stack-text">
                  Ongoing shipments by milestone.
                </Text>
              </Stack>
              <FlexboxGrid>
                {options.map((o, i) => (
                  <FlexboxGrid.Item
                    className="mb-3"
                    key={i}
                    as={Col}
                    xs={24}
                    sm={12}
                    lg={6}
                  >
                    <Panel
                      bordered
                      style={{ background: "#F0F4FE" }}
                      className="panel"
                    >
                      <Stack alignItems="center">
                        <o.Icon className="me-2" size={22} />
                        <Text weight="bold" size="sm">
                          {o.title}
                        </Text>
                      </Stack>
                      <Text weight="bold" size={25} className="cardbottom-text">
                        {o.count}
                      </Text>
                    </Panel>
                  </FlexboxGrid.Item>
                ))}
              </FlexboxGrid>
            </Panel>
          </div>
          {[1, 2, 3, 4].map(() => (
            <div className="col-md-4">
              <Panel bordered className="text-center lastCard">
                <PiDiamondsFourLight color="blue" size={30} />
                <Text size="lg" className="pt-4 " weight="bold">
                  Follow your orders
                </Text>
                <Text>Keep updated on your shippments</Text>

                <Text weight="extrabold" className="pt-5">
                  <FcInfo size={22} className="mb-1" /> Show me how
                </Text>
                <Button appearance="primary">Track</Button>
              </Panel>
            </div>
          ))}
        </div>
      </>
    </div>
  );
};

export default Dashboard;
