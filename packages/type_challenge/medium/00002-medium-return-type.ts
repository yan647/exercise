type MyReturnType<T extends (...args: any[]) => any> = T extends (...args: any[]) => infer U ? U :never

const fn = (v: boolean) => {
  if (v) return 1;
  return 2;
};

type a = MyReturnType<typeof fn> // should be "1 | 2"
