import React,{useState} from "react";
import Select,{Option} from 'rc-select'
import Styles from './styles.scss'
export default function EgRcSelect({}) {
  const [value,setValue] =useState('3')
  const onChange=(val:string)=>{
    setValue(val)
  }
  return <>
    <Select
      onChange={onChange}
      dropdownMatchSelectWidth={500}
      value={value}
      className={Styles.egRcSelect}
    >
      <Option value="1">
        Jack Jack Jack Jack Jack Jack Jack Jack Jack Jack Jack
      </Option>
      <Option value="2">
        Lucy Lucy Lucy Lucy Lucy Lucy Lucy Lucy Lucy Lucy
      </Option>
      <Option value="3">Jill</Option>
    </Select>
  </>
}
