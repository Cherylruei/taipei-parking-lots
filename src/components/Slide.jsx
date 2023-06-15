import React from 'react';
import { Modal } from 'styles/Slide.styled';
import parking from 'assets/icons/parking.png';

function Slide({ selectedLot }) {
  return (
    <Modal>
      <div className='title'>
        <img src={parking} alt='lot' className='iconLot' />
        <h2>{selectedLot.name}</h2>
      </div>
      <div className='address'>{selectedLot.address}</div>
      <div className='text'>營業時間: {selectedLot.serviceTime}</div>
      <div className='text'>聯繫電話: {selectedLot.tel}</div>
      <div
        className={
          selectedLot.payex.length > 100 ? 'payment' : 'payment smInfo'
        }
      >
        {selectedLot.payex}
      </div>
    </Modal>
  );
}

export default Slide;
