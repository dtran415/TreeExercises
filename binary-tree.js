/** BinaryTreeNode: node for a general tree. */

class BinaryTreeNode {
    constructor(val, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

class BinaryTree {
    constructor(root = null) {
        this.root = root;
    }

    /** minDepth(): return the minimum depth of the tree -- that is,
     * the length of the shortest path from the root to a leaf. */

    minDepth(node = this.root, currentDepth = 1) {
        if (!this.root)
            return 0;

        // if current node has no children it's a leaf and return the current depth
        if (!node.left || !node.right)
            return currentDepth;

        // return the minimum of the left branch or the right branch
        return Math.min(this.minDepth(node.left, currentDepth + 1), this.minDepth(node.right, currentDepth + 1));
    }

    /** maxDepth(): return the maximum depth of the tree -- that is,
     * the length of the longest path from the root to a leaf. */

    maxDepth(node = this.root, currentDepth = 1) {
        if (!this.root)
            return 0;

        // if no children then leaf
        if (!node.left && !node.right)
            return currentDepth;

        // if no left, get max of right
        if (!node.left)
            return this.maxDepth(node.right, currentDepth + 1);

        // if no right, get max of left
        if (!node.right)
            return this.maxDepth(node.left, currentDepth + 1);

        // if both nodes have children get max of either left or right
        return Math.max(this.maxDepth(node.left, currentDepth + 1), this.maxDepth(node.right, currentDepth + 1));

    }

    /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
     * The path doesn't need to start at the root, but you can't visit a node more than once. */

    maxSum() {
        if (!this.root)
            return 0;

        let result = this.root.val;

        function maxPathSum(node) {
            if (!node)
                return 0;

            let leftMax = maxPathSum(node.left);
            let rightMax = maxPathSum(node.right);

            // compare with 0 in case of negative
            leftMax = Math.max(leftMax, 0);
            rightMax = Math.max(rightMax, 0);

            // what the value would be if we go both sides
            const maxWithSplit = node.val + leftMax + rightMax;

            // update the result if splitting is better
            result = Math.max(result, maxWithSplit);

            // return the max if not splitting
            return node.val + Math.max(leftMax, rightMax);
        }

        maxPathSum(this.root);

        return result;
    }

    /** nextLarger(lowerBound): return the smallest value in the tree
     * which is larger than lowerBound. Return null if no such value exists. */

    nextLarger(lowerBound, node = this.root, current = null) {
        if (!this.root)
            return null;

        if (node.val > lowerBound && (!current || node.val < current)) {
            current = node.val;
        }

        if (!node.left && !node.right)
            return current;

        if (!node.left)
            return this.nextLarger(lowerBound, node.right, current);

        if (!node.right)
            return this.nextLarger(lowerBound, node.left, current);

        const leftLower = this.nextLarger(lowerBound, node.left, current);
        const rightLower = this.nextLarger(lowerBound, node.right, current);

        if (!leftLower && !rightLower)
            return null;

        return Math.min(leftLower, rightLower);
    }
}

module.exports = { BinaryTree, BinaryTreeNode };
