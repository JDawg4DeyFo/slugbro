import * as ImagePicker from 'expo-image-picker';
import { Toast } from 'react-native-toast-notifications';
import { SuccessToast, ErrorToast } from './FireBaseFunctions';

const reduct_image_quality_to_this = 0.2; //what quality do you want?
const image_aspect_ratio: [number, number] = [1,1] //what aspect do you want?

export const pickMedia = async () => {
  try {
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: image_aspect_ratio,
        quality: reduct_image_quality_to_this
    });

    if (!result.canceled) {
        // console.log(result.assets[0].uri);
        Toast.show('Image selected', SuccessToast);
        return result.assets[0]; // Return the filepath of the image on the device
    }

    // Return null if the image selection was cancelled
    throw Error('Image selection cancelled');
  }
  catch (error: any) {
    Toast.show('Image selection failed: ' + error.message, ErrorToast);
    return null;
  }
};


// -------------------------------------------------------
//                  Example usage
// -------------------------------------------------------
/*
const handleImageSelection = async () => {
    const imageUri = await pickMedia();
  
    if (imageUri) {
      console.log(`Selected image URI: ${imageUri}`);
      // Handle the selected image URI: this will be the step where you send to firebase & get downloadURL
    } else {
      console.log('Image selection cancelled.');
      // Handle the case where the user cancels image selection
    }
  };
*/

