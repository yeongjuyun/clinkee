import styled from 'styled-components';
import { useState } from 'react';
import { SiteBlockProps, ColorSet } from '../../blockValidator';
import { selectBlockById } from '../../../../reducers/SiteReducer';
import { selectHostedBlockById } from '../../../../reducers/HostReducer';
import * as blockValidator from '../../blockValidator';
import { useAppSelector } from '../../../../reducers';

const Container = styled.div<{ colorSet: ColorSet; font: string }>`
  background-color: ${(props) => props.colorSet.background};
  font-family: ${(props) => props.font};
  color: ${(props) => props.colorSet.surface};

  padding: 100px 40px;
  margin: 0 auto;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;

  @media screen and (max-width: 1120px) {
    justify-content: flex-start;
  }
`;

const TextContainer = styled.div`
  vertical-align: middle;
  padding-top: 30px;

  @media screen and (max-width: 1120px) {
    width: 400px;
  }
`;

const Img = styled.img`
  width: 400px;
  padding-right: 20px;
  padding-top: 30px;

  @media screen and (max-width: 1120px) {
    width: 400px;
    padding-right: 0;
  }
`;

export const ImgDiv = styled.div`
  width: 400px;
  height: 240px;
  background-color: #efefef;
  text-align: center;
  line-height: 240px;
  @media screen and (max-width: 1120px) {
    width: 400px;
    padding-right: 0;
  }
`;

const Caption = styled.div<{ colorSet: ColorSet }>`
  font-size: 1rem;
  font-weight: 600;
  color: ${(props) => props.colorSet.primary};
  margin-bottom: 10px;

  @media screen and (max-width: 1120px) {
    font-size: 1.4vw;
  }
`;

const Header = styled.span`
  font-size: 2rem;
  font-weight: 700;
  color: black;

  @media screen and (max-width: 1120px) {
    font-size: 2.8vw;
  }
`;

const Body = styled.div<{ colorSet: ColorSet }>`
  color: ${(props) => props.colorSet.surface};

  @media screen and (max-width: 1120px) {
    font-size: 1.4vw;
  }
`;

const Button = styled.button<{ colorSet: ColorSet }>`
  background-color: ${(props) => props.colorSet.primary};
  color: white;
  padding: 10px 20px;
  border: 0;
  border-radius: 7px;
  font-size: 1rem;
  margin-top: 20px;

  :hover {
    cursor: pointer;
  }

  @media screen and (max-width: 1120px) {
    font-size: 1.4vw;
    padding: 1vw 2vw;
  }
`;

function highlightHandler(header: string, keyword: string, colorSet: ColorSet) {
  const HeaderHighlight = styled.span`
    font-size: 2rem;
    font-weight: 700;
    color: ${colorSet.primary};

    @media screen and (max-width: 1120px) {
      font-size: 2.8vw;
    }
  `;

  let result = [];

  if (header.includes(keyword)) {
    const splitedByKeyword = header.split(keyword);
    for (let i = 0; i < splitedByKeyword.length - 1; i++) {
      result.push(
        <>
          <Header>{splitedByKeyword[i]}</Header>
          <HeaderHighlight>{keyword}</HeaderHighlight>
        </>
      );
    }
    result.push(
      <Header>{splitedByKeyword[splitedByKeyword.length - 1]}</Header>
    );
  } else {
    result.push(<Header>{header}</Header>);
  }

  return result.map((item) => item);
}

export default function SiteBlock(props: SiteBlockProps) {
  const { blockId, type } = props;
  let colorSet, font;
  let data: blockValidator.BlockData;

  console.log(333333, type);

  // 호스팅 페이지 데이터
  const hostColorSet = useAppSelector((state) => state.host.colorSet);
  const hostFont = useAppSelector((state) => state.host.font);
  const hostData = useAppSelector(
    (state) => selectHostedBlockById(state, blockId).data
  );

  console.log(44444, hostData);

  // 미리보기 화면 데이터
  const previewData = useAppSelector(
    (state) => selectBlockById(state, blockId).data
  );
  const previewColorSet = useAppSelector((state) => state.site.colorSet);
  const previewFont = useAppSelector((state) => state.site.font);

  console.log(55555, previewData);

  if (type === 'host') {
    colorSet = hostColorSet;
    font = hostFont;
    data = {
      navTitle: hostData.navTitle,
      logoImage: {
        src: hostData.image?.src,
        alt: hostData.image?.alt,
      },
      logoText: hostData.logoText,
      image: {
        src: hostData.image?.src,
        alt: hostData.image?.alt,
      },
      caption: hostData.caption,
      header: hostData.header,
      headerHighlight: hostData.headerHighlight,
      body: hostData.body,
      button: hostData.button,
      rightText: hostData.rightText,
      leftText: hostData.leftText,
      arrText: hostData.arrText,
    };
  } else {
    colorSet = previewColorSet;
    font = previewFont;
    data = {
      navTitle: previewData.navTitle,
      logoImage: {
        src: previewData.image?.src,
        alt: previewData.image?.alt,
      },
      logoText: previewData.logoText,
      image: {
        src: previewData.image?.src,
        alt: previewData.image?.alt,
      },
      caption: previewData.caption,
      header: previewData.header,
      headerHighlight: previewData.headerHighlight,
      body: previewData.body,
      button: previewData.button,
      rightText: previewData.rightText,
      leftText: previewData.leftText,
      arrText: previewData.arrText,
    };
  }

  console.log(33333, data);

  function buttonHandler() {
    window.location.href = data.button?.url ? data.button.url : '';
  }
  return (
    <>
      <Container colorSet={colorSet} font={font} id={data.navTitle ?? ''}>
        {data.image?.src ? (
          <Img src={data.image.src} alt={data.image.alt ?? ''} />
        ) : (
          <ImgDiv>여기에 이미지가 보여집니다.</ImgDiv>
        )}
        <TextContainer>
          {data.caption?.value && (
            <Caption colorSet={colorSet}>{data.caption.value}</Caption>
          )}
          <div>
            {data.header?.value &&
              (data.headerHighlight ? (
                highlightHandler(
                  data.header.value,
                  data.headerHighlight.value,
                  colorSet
                )
              ) : (
                <Header>{data.header.value}</Header>
              ))}
          </div>
          {data.body?.value && (
            <Body colorSet={colorSet}>{data.body.value}</Body>
          )}
          {data.button?.title && (
            <Button
              colorSet={colorSet}
              color={colorSet.primary}
              onClick={buttonHandler}
            >
              {data.button.title}
            </Button>
          )}
        </TextContainer>
      </Container>
    </>
  );
}
