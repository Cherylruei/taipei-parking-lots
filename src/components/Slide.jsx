import React from 'react';
import { Modal } from 'styles/Slide.styled';
import { IconX } from 'assets/icons';

function Slide({
  selectedLot,
  setSelected,
  currentInfoWindow,
  setCurrentInfoWindow,
}) {
  const handleModal = () => {
    currentInfoWindow.close();
    setSelected(null);
    setCurrentInfoWindow(null);
  };
  return (
    <Modal>
      {selectedLot.id}
      <div className='iconX' onClick={handleModal}>
        <IconX />
      </div>
    </Modal>
  );
}

export default Slide;
