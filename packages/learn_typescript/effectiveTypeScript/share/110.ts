// 类型安全的签名
export function useImmer<S = any>(initialValue: S | (() => S)): [S, (f: (draft: Draft<S>) => void | S) => void];

// 没那么安全的实现
export function useImmer(initialValue: any) {
  const [val, updateValue] = useState(initialValue);
  return [val, useCallback(updater => {
    updateValue(produce(updater));
  }, [])];
}

