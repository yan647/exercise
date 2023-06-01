import Select,{Option} from 'rc-select'
import Styles from './styles.scss'
export default function EgRcSelect({}) {
  const value='3'
  return <>
    <Select
      // onChange={this.onChange}
      dropdownMatchSelectWidth={500}
      value={value}
      dropdownClassName={Styles.dropdown}
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
