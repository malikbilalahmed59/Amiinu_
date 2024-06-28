import { FcInfo } from "react-icons/fc";
import { PiDiamondsFourLight } from "react-icons/pi";
import { Button, Panel, Stack, Text } from "rsuite";
import "./Dashboard.css";
import { AtdistinationIcon, BookingConfirmation, BookingIcon, DeliveredIcon, DeliveryIcon, OriginHandIcon, TransitIcon, TransitShipperIcon } from "./Icons";
const Dashboard = () => {
  const options = [
    {
      Icon: <BookingIcon/>,
      count: 0,
      title: "Booking Created.",
    },
    {
      Icon: <BookingConfirmation/>,
      count: 0,
      title: "Booking Confirmation.",
    },
    {
      Icon: <TransitShipperIcon/>,
      count: 0,
      title: "In transit from shipper",
    },
    {
      Icon: <OriginHandIcon/>,
      count: 0,
      title: "On Hand At Origin",
    },
    {
      Icon: <TransitIcon/>,
      count: 0,
      title: "In transit",
    },
    {
      Icon: <AtdistinationIcon/>,
      count: 0,
      title: "On Hand At Destination",
    },
    {
      Icon: <DeliveryIcon/>,
      count: 0,
      title: "Out of Delivery",
    },
    {
      Icon: <DeliveredIcon/>,
      count: 0,
      title: "Delivered",
    },
  ];
  const listlable = [
    {
      Icon: "",
      title: "Follow your orders",
      subtitle: "Keep updated on your shipments",
      label:"#",
      sublabel:"Track",
    },
    {
      Icon: "",
      title: "Access your reports",
      subtitle: "You can Personalize and Export your own reports",
      label:"#",
      sublabel:"Report",
    },
    {
      Icon: "",
      title: "Create a quote",
      subtitle: "To share it with your suppliers and then confirm the booking",
      label:"#",
      sublabel:"New quote",
    },
    {
      Icon: "",
      title: "Book from scratch",
      subtitle: "To create a booking in one click on myCeva account",
      label:"#",
      sublabel:"New booking",
    },
  ]

  return (
    <div className="firstBoxs container">
      <>
        <div className="row">
          <div className="mb-2 col-md-8  p-2">
            <Panel bordered className="panelCardbg">
              <Stack className="mb-3 mt-2 ms-2 stack-text">
                <Text size="lg" className="me-2 stack-text" weight="bold">
                  Track
                </Text>
                <Text className="stack-text">
                  Ongoing shipments by milestone.
                </Text>
              </Stack>
              <div className="parentCard-milestone">
                {options.map((o, i) => (
                  <div
                    className="mb-3 panelSmall-card"
                    key={i}
                 
                  >
                    <div
                    
                      style={{ background: "white" }}
                      className="panelsm-card"
                    >
                      <div className="tracktop-card" >
                        <div> {o.Icon}</div>
                      <div><span className="tractText" >
                          {o.title}
                        </span></div>
                    
                      </div>
                      <div className="trackbottom-card">
                      <span   className="cardbottom-text"> 
                        {o.count}
                      </span>
                      </div>
                      
                    </div>
                  </div>
                ))}
              </div>
            </Panel>
          </div>
          {listlable.map((index) => (
            <div className="col-md-4 p-2">
              <div  className="text-center lastCard">
                <PiDiamondsFourLight color="blue" size={30} />
                <Text size="lg" className="pt-3 indexTitle " weight="bold">
                 {index.title}
                </Text>
                <Text className="indexSubtitle">{index.subtitle}</Text>

                <Text weight="extrabold" className="pt-4">
                  <FcInfo size={22} className="mb-1" /> {index.label}
                </Text>
                <Button appearance="primary" className="bg-primary mt-4 indexSublabel">{index.sublabel}</Button>
              </div>
            </div>
          ))}
        </div>
      </>
    </div>
  );
};

export default Dashboard;
