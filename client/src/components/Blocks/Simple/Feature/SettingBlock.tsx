import { useState } from 'react';
import { TextInput, CustomSelect, ImgInput } from '../../../Input';
import { Card } from '../../../Card/Card';
import { getCurrentStyleOption, getStyleOptions } from '../../blockHelper';
import { useSelector, useDispatch } from 'react-redux';
import {
  updateBlockData,
  selectBlockById,
  updateTemplate,
} from '../../../../reducers/SiteReducer';
import type { RootState } from '../../../../reducers/store';
import * as icon from '../../../../icons';
import { SettingBlockProps, StyleData } from '../../blockValidator';
import axios from 'axios';

function SettingBlock({ blockId, onRemove }: SettingBlockProps) {
  const { id, template, data, isCardOpened } = useSelector((state: RootState) =>
    selectBlockById(state, blockId)
  );
  const styleOptions = getStyleOptions(template);
  const currentStyle = getCurrentStyleOption(template);
  const dispatch = useDispatch();

  //Input
  const [navTitle, setNavTitle] = useState(data.navTitle);
  const [style, setStyle] = useState(currentStyle);
  const [caption, setCaption] = useState(data.caption?.value);
  const [header, setHeader] = useState(data.header?.value);
  const [headerHighlight, setHeaderHighlight] = useState(
    data.headerHighlight?.value
  );
  const [body, setBody] = useState(data.body?.value);
  const [button, setButton] = useState(data.button);
  const [image, setImage] = useState(data.image);

  async function imgHandler(data: any) {
    const formData = new FormData();
    formData.append('file', data);

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    const result = await axios.post('/api/site/image', formData, config);
    
    setImage(result.data);
    dispatch(
      updateBlockData({
        blockId: id,
        field: 'image',
        value: {
          src: result.data,
          alt: result.data,
        },
      })
    );
  }

  return (
    <>
      <Card
        title="Feature"
        onRemove={onRemove}
        icon={icon.Feature}
        isCardOpened={isCardOpened}
        blockId={blockId}
      >
        <TextInput
          title="메뉴명"
          required={false}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setNavTitle(e.target.value);
            dispatch(
              updateBlockData({
                blockId: id,
                field: 'navTitle',
                value: e.target.value,
              })
            );
          }}
          guideline="네비게이션 바에 입력될 메뉴명을 입력하세요."
          value={navTitle}
        ></TextInput>
        <CustomSelect
          title="스타일"
          required
          guideline="스타일를 선택해주세요."
          placeholder="원하는 선택지를 선택해주세요"
          options={styleOptions}
          onChange={(e: StyleData) => {
            setStyle(e);
            dispatch(updateTemplate({ blockId: id, newTemplate: e.value }));
          }}
          value={style}
        />
        <ImgInput
          title="이미지"
          guideline="사이트에 표시할 이미지를 업로드하세요"
          src={image?.src}
          alt={image?.alt}
          placeholder={image?.src}
          onChange={imgHandler}
        />
        <TextInput
          title="캡션"
          required={false}
          guideline="캡션에 표시될 내용을 입력하세요."
          value={caption}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setCaption(e.target.value);
            dispatch(
              updateBlockData({
                blockId: id,
                field: 'caption',
                value: { value: e.target.value },
              })
            );
          }}
        ></TextInput>
        <TextInput
          title="헤드라인"
          required
          guideline="헤드라인에 표시될 내용을 입력하세요."
          value={header}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setHeader(e.target.value);
            dispatch(
              updateBlockData({
                blockId: id,
                field: 'header',
                value: { value: e.target.value },
              })
            );
          }}
        ></TextInput>
        <TextInput
          title="헤드라인 강조 테스트"
          required={false}
          guideline="헤드라인 내용 중에서 강조할 텍스트를 입력하세요"
          value={headerHighlight}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setHeaderHighlight(e.target.value);
            dispatch(
              updateBlockData({
                blockId: id,
                field: 'headerHighlight',
                value: { value: e.target.value },
              })
            );
          }}
        ></TextInput>
        <TextInput
          title="설명"
          required={false}
          guideline="설명에 표시될 내용을 입력하세요"
          value={body}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setBody(e.target.value);
            dispatch(
              updateBlockData({
                blockId: id,
                field: 'body',
                value: { value: e.target.value },
              })
            );
          }}
        ></TextInput>
        <TextInput
          title="버튼 텍스트"
          required={false}
          guideline="비워둘 경우 버튼이 나타나지 않습니다."
          value={button?.title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setButton({ ...button, title: e.target.value });
            dispatch(
              updateBlockData({
                blockId: id,
                field: 'button',
                value: { ...button, title: e.target.value },
              })
            );
          }}
        ></TextInput>
        <TextInput
          title="버튼 URL"
          required={false}
          guideline="버튼 클릭시 이동될 url을 입력하세요"
          value={button?.url}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setButton({ ...button, url: e.target.value });
            dispatch(
              updateBlockData({
                blockId: id,
                field: 'button',
                value: { title: button?.title, url: e.target.value },
              })
            );
          }}
        ></TextInput>
      </Card>
    </>
  );
}

export default SettingBlock;
