function countBattleships(board: string[][]): number {
  const row=board.length,col=board[0].length;
  let num=0;
  for(let a=0;a<row;a++) {
    for(let b=0;b<col;b++) {
      if(board[a][b]==='X'){
        board[a][b]='.';
        for(let m=a+1;m<row && board[m][b]==='X';m++) {
          board[m][b]='.';
        }
        for(let n=b+1;n<col && board[a][n]==='X';n++) {
          board[a][n]='.';
        }
        num++;
      }
    }
  }
  return num;
};
console.log(countBattleships([["X",".",".","X"],[".",".",".","X"],[".",".",".","X"]]));
console.log(countBattleships([["X"]]));
console.log(countBattleships([[""]]));

function countBattleships2(board: string[][]): number {
  let num=0;
  const row=board.length,col=board[0].length;
  for(let i=0;i<row;i++) {
    for(let j=0;j<col;j++){
      if(board[i][j]==='X'){
        if((j===0 || board[i][j-1]==='.') && (i===0 || board[i-1][j]==='.')){
          num++;
        }
      }
    }
  }
  return num;
}

console.log(countBattleships2([["X",".",".","X"],[".",".",".","X"],[".",".",".","X"]]));
console.log(countBattleships2([["X"]]));
console.log(countBattleships2([[""]]));
