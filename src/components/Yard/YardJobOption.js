import React from "react";
import { Card } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { Button } from "@utilities";
import Icon from '@material-ui/core/Icon';


const yardOptions=[
  {
    cardName:"Yard Operation",
    iconClass:"mr-5 fa fa-briefcase",
    path:"/yard/operation",
    isState:true
 },
 {
  cardName:"Loaction Update",
  iconClass:" mr-5 fa fa-map-marker",
  path:"/location-update",
  isState:false
 }
]

export default function FacilityPage(props) {
  const yardCrane =
    props &&
    props.location &&
    props.location.state &&
    props.location.state.yardCrane;

  const history = useHistory();
  const handleClick = (isState,path) => {
    history.push({
      pathname: path,
      state:  isState ?{ yardCrane: yardCrane }:undefined,
    });
  };
  return (
    <>
      <div className="row internalRow">
        <div className="mt-5 col-12 d-flex justify-content-start">
          <Link to="/yard/crane" >
            <Button
              // classes="mt-2"
              type="submit"
              variant="primary"
              buttonText="Back"
            />
          </Link>
        </div>
      </div>
      <div className="row internalRow mt-5">
        {yardOptions && yardOptions.map(item=>(
          <div className="col-md-6 mb-3 mb-md-0 mb-lg-0 mb-xl-0">
            <Card onClick={()=>handleClick(item.isState,item.path)} style={{ cursor: "pointer" }} className="operation-card" >
              <Card.Body className="cardMobile">
                <Card.Title  className="cart-text">
                  <Icon className={item.iconClass} />{item.cardName}
                </Card.Title>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </>
  );
}
