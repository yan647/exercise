class TreeNode {
    val: number
    left: TreeNode | null
    right: TreeNode | null

    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = (val === undefined ? 0 : val)
        this.left = (left === undefined ? null : left)
        this.right = (right === undefined ? null : right)
    }
}

function maxAncestorDiff(root: TreeNode | null): number {
    function _maxAncestorDiff(_root: TreeNode | null,max:number,min:number): number {
        if (!_root) {
            return 0
        } else {
            max=Math.max(_root.val,max)
            min=Math.min(_root.val,min)
            let result= max-min
            // let result=Math.max(Math.abs(_root.val-max),Math.abs(_root.val-min))
            // max=Math.max(_root.val,max)
            // min=Math.min(_root.val,min)
            result=Math.max(result,_maxAncestorDiff(_root.left,max,min))
            return Math.max(result,_maxAncestorDiff(_root.right,max,min))
        }

    }

    return _maxAncestorDiff(root,root.val,root.val);
};
