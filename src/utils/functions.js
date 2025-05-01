import { Dimensions } from 'react-native';
import { UAParser } from "ua-parser-js";

const { height, width } = Dimensions.get('window')

const isDesktop = () => {
  const parser = new UAParser();
  const result = parser.getResult();
  if (result.device.type === "mobile") {
    return false
  } else if (result.device.type === "tablet") {
    return false
  } else {
    return true
  }
}

const calculateWidth = () => {
  const aspectRatio = 9 / 16;
  return height * aspectRatio;
};

const calculateDesktopWidth = ({width: currentWidth}) => {
  const desktopStatus = isDesktop()
  if(desktopStatus) {
    const desktopWidth = calculateWidth()
    return desktopWidth
  } else {
    return currentWidth?currentWidth:width
  }
}

const formatData = ({data}) => {
  const keys = data.values[0];
  const _data = data.values.slice(1);
  const obj = _data.map(arr => Object.assign({}, ...keys.map((k, i) => ({ [k]: arr[i] }))));
  return obj
}

export { calculateWidth, calculateDesktopWidth, formatData }