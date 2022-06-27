import {
  Button,
  ButtonProps,
  Modal,
  ModalProps,
  SharedButtonProps,
} from "@mantine/core";
import React, { ElementType, ReactFragment, useState } from "react";

interface Props {
  title: string;
  buttonTitle: string;
  modalProps?: ModalProps;
  buttonProps?: ButtonProps<any> & React.HTMLProps<HTMLButtonElement>;
  children: JSX.Element;
}
const AutoModal = ({
  title,
  buttonTitle,
  modalProps,
  buttonProps,
  children,
}: Props) => {
  const [uiState, setUiState] = useState({
    isModalOpen: false,
  });

  const handleCloseModal = () =>
    setUiState((prev) => ({ ...prev, isModalOpen: false }));
  const handleOpenModal = () =>
    setUiState((prev) => ({ ...prev, isModalOpen: true }));

  return (
    <>
      <Button variant="filled" {...buttonProps} onClick={handleOpenModal}>
        {buttonTitle}
      </Button>
      <Modal
        {...modalProps}
        opened={modalProps?.opened || uiState.isModalOpen}
        onClose={modalProps?.onClose || handleCloseModal}
        title={title}
      >
        {React.createElement("div", {
          onClose: handleCloseModal,
          state: uiState,
          ...children.props,
        })}
      </Modal>
    </>
  );
};

export default AutoModal;
