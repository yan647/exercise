interface ButtonProps {
  type: string;
  size: 'large' | 'middle' | 'small'
}

interface ButtonPropsWithChildren {
  type: string;
  size: 'large' | 'middle' | 'small',
  children: React.ReactNode
}

// 使用PropsWithChildren简化
import {PropsWithChildren} from 'react';

type ButtonPropsWithChildren = PropsWithChildren<ButtonProps>

// 使用index type | mapped type | keyof 等进行类型传递
interface State {
  userId: string;
  pageTitle: string;
  recentFiles: string[]
  pageContents: string;
}

interface TopNavState {
  userId: string;
  pageTitle: string;
  recentFiles: string[]
}

// 上述代码可通过lookup type简化
interface TopNavState

= {userId: State['userId']; pageTitle: State['pageTitle'] recentFiles: State['recentFiles']}
// 使用mapped type 可进一步简化
type TopNavState = { [k in 'userId' | 'pageTitle' | 'recentFiles']: State[k] }
// 再使用工具类进一步简化
type TopNavState = Pick<State, 'userId', 'pageTitle', 'rencentFiles'>

// 我们也可以利用typeof来进行类型传递
function getUserInfo(userId: string) {
  return {userId, name, age, height, weight, favoriteColor}
}

type UserInfo = ReturnType<typeof getUserInfo>

// 编写utility type时，多多使用generic constraint保证实例化时的类型安全
interface Name {
  first: string;
  last: string
}

type Pick1<T, K>
{
  [k in K]
:
  T[k]
}
type FirstLast = Pick1<Name, 'first' | 'last'>
type FirstMiddle = Pick1<Name, 'first', 'middle'> // 应该报错但没报错 type Pick2<T, K extends keyof T> = { // 添加泛型约束 [k in K]: T[K] } type FirstMiddle = Pick2<Name, 'first', 'middle'> // 正确的报错了
