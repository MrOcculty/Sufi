import { Dimensions, PixelRatio } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const cfs = (baseFontSize) => {

    const ratio = screenWidth < screenHeight ? (screenWidth / 360) : (screenHeight / 360); // Adjust 360 to your design's base width
    const newSize = baseFontSize * ratio;
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
}

export default cfs