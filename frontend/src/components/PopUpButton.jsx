import React from "react";
import { Popover, OverlayTrigger, Button } from "react-bootstrap";

const PopUpButton = ({
  trigger,
  placement,
  title,
  body,
  btnVariant,
  btnName,
  popoverId,
}) => {
  return (
    <OverlayTrigger
      trigger={trigger}
      placement={placement}
      overlay={
        <Popover id={popoverId}>
          <Popover.Header as="h3">{title}</Popover.Header>
          <Popover.Body>{body}</Popover.Body>
        </Popover>
      }
    >
      <Button variant={btnVariant}>{btnName}</Button>
    </OverlayTrigger>
  );
};

export default PopUpButton;
