import { Button, Loader, Tooltip } from "@mantine/core";
import { IconPlayerPlay } from "@tabler/icons-react";
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
  return (
    <Tooltip label={"Send Message"}>
      <Button
        name={name}
        type="submit"
        size="md"
        disabled={loading || disabled}
        variant="default"
        leftSection={
          loading ? <Loader size={15} /> : <IconPlayerPlay size={24} />
        }
      >
        Send Message
      </Button>
    </Tooltip>
  );
};
