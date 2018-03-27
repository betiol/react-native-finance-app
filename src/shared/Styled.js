import styled from "styled-components/native";
import Colors from "@shared/Colors";
import { View, ScrollView } from "react-native";
export const StyledContainerView = styled(View)`
  flex: 1;
  background-color: #fff;
`;

export const TextAmount = styled.Text`
  font-size: 40;
  padding-top: 40;
  color: #fff;
  text-align: center;
`;

export const StyledScrollView = styled(ScrollView)`
  flex: 1;
  background-color: #fff;
`;

export const ContainerRowWithSpaceBetween = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
