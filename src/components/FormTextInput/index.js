import styled from 'styled-components/native';
import { robotoWeights } from 'react-native-typography';

const borderRadius = 50;
const componentHeight = 58;
const componentPadding = 18;

const FormTextInput = styled.TextInput`
  ${robotoWeights.lightObject};
  background-color: rgba(255, 255, 255, 0.45);
  border-radius: ${borderRadius};
  color: #232855;
  font-size: 18;
  height: ${componentHeight};
  margin-bottom: 5;
  margin-left: 5;
  margin-right: 5;
  margin-top: 5;
  padding-bottom: ${componentPadding};
  padding-left: ${componentPadding};
  padding-right: ${componentPadding};
  padding-top: ${componentPadding};
`;

export default FormTextInput;
