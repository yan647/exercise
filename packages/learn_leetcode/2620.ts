function createCounter(n: number): () => number {
    let count=-1
    return function() {
        count++
        return n+count
    }
}


/**
 * const counter = createCounter(10)
 * counter() // 10
 * counter() // 11
 * counter() // 12
 */
