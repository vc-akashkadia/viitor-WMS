import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Button } from "@utilities";
import Icon from '@material-ui/core/Icon';

const operationOptions =[
  {
    cardName: "Gate In",
    redirectionPath:"gate/in",
    iconClass:"mr-5 fa fa-indent"
  },
  {
    cardName: "Gate Out",
    redirectionPath:"gate/out",
    iconClass:"mr-5 fa fa-outdent"
  },
  {
    cardName: "Yard Job",
    redirectionPath:"/yard/crane",
    iconClass:"mr-5 fa fa-briefcase"
  }
]
export default function OperationPage(props) {
  return (
    <>
      <div className="row internalRow">
        <div className="my-5 col-12 d-flex justify-content-start">
          <Link to="/facility">
            <Button
              // classes="back-btn"
              type="submit"
              variant="primary"
              buttonText="Back"
            />
          </Link>
        </div>
      </div>
      <div className="row internalRow">
        {operationOptions && operationOptions.map(item=>(
          <div className="col-md-6 mb-3">
            <Link
              className="text-dark text-hover-primary mb-1 font-size-lg"
              to={item.redirectionPath}
            >
              <Card className="operation-card">
                <Card.Body className="cardMobile">
                  <Card.Title className="cart-text"><Icon className={item.iconClass} />{item.cardName}</Card.Title>
                </Card.Body>
              </Card>
            </Link>
          </div>
        ))}
      </div>

      {/* <div className="mt-5 mr-2 d-flex justify-content-start top-btn-spacing" > */}
      
    </>
  );
}
