

type AxiosRequestConfig=string;
type AxiosPromise=Promise;

type ActionType=<T = unknown>(url: string, params?: Record<string, unknown>, config?: AxiosRequestConfig)=> Promise<T>;


const post:ActionType=()=>{

}

class aa{
  get:ActionType= ()=>{
    const ex:<T>=()=>{};
    return new Promise(ex);
  }
  constructor() {
  }
}


function postInner<T = any> (a: T): T {
  return a
}

function postOuter<T = any> (b: string) {
  return postInner(b);
}

const postInnerNumber = postInner<string>(1);

const bb=1 as number;
postInner(bb)

Promise<void>





