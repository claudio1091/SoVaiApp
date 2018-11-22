import styled from 'styled-components/native';

const componentHeight = 58;
const componentPadding = 18;

const FormTextInput = styled.TextInput`
  background-color: rgba(255, 255, 255, 0.45);
  border-radius: 50;
  color: #232855;
  font-family: 'roboto-light';
  font-size: 18;
  height: ${componentHeight};
  margin-vertical: 5;
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
