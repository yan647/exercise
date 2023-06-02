import Styles from './border.scss'
export default function Square({value, onSquareClick}: { value?: string, onSquareClick: () => void }) {
  return (<button className={Styles.square} onClick={onSquareClick}>{value}</button>);
}
