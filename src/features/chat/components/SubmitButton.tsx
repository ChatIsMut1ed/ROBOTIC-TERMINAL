import { Tooltip } from "@mantine/core";
import { IconPlaneDeparture, IconSolarPanel } from "@tabler/icons-react";
import React from "react";

interface SubmitButtonProps {
  loading: boolean;
  disabled: boolean;
  name?: string;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({
  loading,
  disabled,
  name,
}) => {
  const strokeColor = disabled ? "white" : "white";

  return (
    <Tooltip label={"send-message"}>
      <button name={name} type="submit" disabled={loading || disabled}>
        {loading ? (
          <IconSolarPanel size={24} stroke={1.5} color={strokeColor} />
        ) : (
          <IconPlaneDeparture size={24} />
        )}
      </button>
    </Tooltip>
  );
};
