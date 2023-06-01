import Styles from './styles.scss'
export default function InfiniteScrollSample({}) {
  const list=new Array(20).fill(1)
  return <div style={{height:'200px',width:'200px',background:'#fffff1',overflow:'scroll'}} className={Styles.listClass}>
    {
      list.map((item,index)=>(<ol>{`hello world No.${index+1}`}</ol>))
    }
  </div>;
}
