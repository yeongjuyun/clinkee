import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import ColorSetExample from "../../ColorSetExample";
import { CustomSelect, Label, Required } from "../../Input";
import AppearanceData from "../AppearanceData";

const Container = styled.div`
  width: 400px;
  padding: 20px;
  background-color: white;
  margin: 0 auto 40px auto;
  border-radius: 5px;
`;

const InnerContainer = styled.div`
  padding: 50px 0;
  display: flex;
  justify-content: center;
`;

function FontExample(props: any) {
  const data = props.font.value ? props.font.value : props.font;

  const FontExample = styled.div`
    font-family: ${data};
    font-size: 40px;
    font-weight: bold;
  `;
  return <FontExample>{data}</FontExample>;
}

export default function Appearance() {
  const fontList = AppearanceData().fontData;
  const colorSetList = AppearanceData().colorSetData;
  const [colorSet, setColorSet] = useState<any>([]);
  const [font, setFont] = useState<any>([]);

  const getStyleInfo = async () => {
    axios.get("/site/2").then((res): void => {
      const data = res.data.sites[0];
      setColorSet(data.colorSet);
      setFont(data.font);
    });
  };

  useEffect(() => {
    getStyleInfo();
  }, []);

  colorSetList.map((item: any) => item === colorSet);
  console.log(
    colorSetList.filter(
      (item: any) => item.value.primary === colorSet.primary
    )[0]
  );
  return (
    <>
      <Container>
        <Label required={true}>
          색상조합
          <Required>*</Required>
        </Label>
        <InnerContainer>
          <ColorSetExample colorSet={colorSet} />
        </InnerContainer>
        <CustomSelect
          value={
            colorSetList.filter(
              (item: any) => item.value.primary === colorSet.primary
            )[0]
          }
          onChange={setColorSet}
          options={colorSetList}
        />
      </Container>
      <Container>
        <Label required={true}>
          폰트
          <Required>*</Required>
        </Label>
        <InnerContainer>
          <FontExample font={font} />
        </InnerContainer>
        <CustomSelect
          value={fontList.filter(
            (item: any) => item.value === font
          )[0]}
          onChange={setFont}
          options={fontList}
        />
      </Container>
    </>
  );
}
