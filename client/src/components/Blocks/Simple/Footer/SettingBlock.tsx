import { useState } from 'react';
import { TextInput, CustomSelect } from '../../../Input';
import { Card } from '../../../Card/Card';

function Footer() {
  const [selectinput, setSelectInput] = useState('');
  const options = [
    { value: '스타일1', label: '스타일1' },
    { value: '스타일2', label: '스타일2' },
    { value: '스타일3', label: '스타일3' },
  ];

  return (
    <>
      <Card title='Footer'>
        <CustomSelect
          title='스타일'
          required={true}
          guideline='스타일를 선택해주세요.'
          placeholder='선택된 항목이 없습니다.'
          options={options}
          onChange={(e: any) => {
            setSelectInput(e.value);
          }}
        />
        <TextInput
          title='왼쪽 텍스트'
          required={false}
          placeholder='©2022 Block Inc. All rights reserved'
          guideline='푸터 왼쪽에 들어갈 문구를 입력하세요'
        ></TextInput>
        <TextInput
          title='오른쪽 텍스트'
          required={true}
          placeholder='블록'
          guideline='푸터 오른쪽에 들어갈 문구를 입력하세요.'
        ></TextInput>
      </Card>
    </>
  );
}

export default Footer;
