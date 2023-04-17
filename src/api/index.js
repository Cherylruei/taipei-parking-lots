import axios from 'axios';
// 將停車場的API 用 axios.get 拿到資料

const lotsDescURL =
  '	https://tcgbusfs.blob.core.windows.net/blobtcmsv/TCMSV_alldesc.json';
const lotsAvailableURL =
  'https://tcgbusfs.blob.core.windows.net/blobtcmsv/TCMSV_allavailable.json';

export const getPlacesData = async () => {
  try {
    const res = await axios.get(lotsDescURL);
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};
