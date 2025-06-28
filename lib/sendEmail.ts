
import emailjs from 'emailjs-com';

export const sendEmail = async (
  name: string,
  email: string,
  message: string
) => {
  try {
    const result = await emailjs.send(
      'service_6mh1vxg',        
      'template_iba1b3c',        
      {
        name,
        email,
        message,
      },
      'O4O0mDtPKZg6QPtOV'        
    );
    return result;
  } catch (error) {
    throw error;
  }
};
