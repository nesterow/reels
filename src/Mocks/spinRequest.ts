
enum Symbols {
    XXX_BAR = 0,
    X_BAR = 1,
    XX_BAR = 2,
    SEVEN = 3,
    CHERRY = 4
}

// [name, win?, reward, multiplier]
const table = () => [
    ['3xCHERRY :TOP',  false, 2000, 1],
    ['3xCHERRY :CENTER',  false, 1000, 1],
    ['3xCHERRY :BOTTOM', false, 4000, 1],
    ['3x7', false, 150, 1],
    ['CHERRY+7', false, 75, 1],
    ['3x3BAR', false, 50, 1],
    ['3x2BAR', false, 20, 1],
    ['3xBAR', false, 10, 1],
    ['BARS+BARS+BARS', false, 5, 1]
]

const getRewards = (matrix: any[]) => {
    
    const all_cherry = (row: any[]) => (
        new Set(row).size === 1 && 
        row.includes(Symbols.CHERRY)
    )

    const all_seven = (row: any[]) => (
        new Set(row).size === 1 && 
        row.includes(Symbols.SEVEN)
    )

    const all_3bar = (row: any[]) => (
        new Set(row).size === 1 && 
        row.includes(Symbols.XXX_BAR)
    )

    const all_2bar = (row: any[]) => (
        new Set(row).size === 1 && 
        row.includes(Symbols.XX_BAR)
    )

    const all_1bar = (row: any[]) => (
        new Set(row).size === 1 && 
        row.includes(Symbols.X_BAR)
    )

    const all_bars = (row: any[]) => (
        !row.includes(Symbols.CHERRY) &&
        !row.includes(Symbols.SEVEN)
    )

    const cherry_and_seven = (row: any[]) => ( 
        row.includes(Symbols.SEVEN) &&
        row.includes(Symbols.CHERRY)
    )
    
    
    //map to table, index:mulpiplier
    const map = {0:0, 1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0}
    const combosMatrix = matrix.map((row: any[], i) => {
        if (i == 0 && all_cherry(row)) {
            map[0] += 1
            return [true, true, true]
        }
        if (i == 1 && all_cherry(row)) {
            map[1] += 1
            return [true, true, true]
        }
        if (i == 2 && all_cherry(row)) {
            map[2] += 1
            return [true, true, true]
        }
        if (all_seven(row)) {
            map[3] += 1
            return [true, true, true]
        }

        if (cherry_and_seven(row)) {
            map[4] += 1
            return [0, 0, 0].map((win, pos) =>(
                row.indexOf(Symbols.CHERRY) == pos ||
                row.indexOf(Symbols.SEVEN) == pos
            ))
        }

        if(all_3bar(row)){
            map[5]+=1
            return [true, true, true]
        }

        if(all_2bar(row)) {
            map[6] += 1
            return [true, true, true]
        }

        if(all_1bar(row)) {
            map[7] += 1
            return [true, true, true]
        }

        if(all_bars(row)) {
            map[8] += 1
            return [true, true, true]
        }

        return [false, false, false]

    })

    return {
        map,
        combosMatrix
    }


}



const getMatrix = (startPositions: number[]) => {
    // i've got 5x3 matrix with 2 hidden elemenents
    // for conveninece symbols are enumerated from 0 to 1
    const matrix = [[0, 0, 0],
                    [0, 0, 0],
                    [0, 0, 0]]
    .map((row, x) => {
        return row.map((col, y) => {
            const begin = startPositions[y]
            return (x + begin) % 5
        })
    })
    
    return matrix
}

export const request = async () => {
    const startPos: number[] = [1, 2, 3].map(() => {
        return Math.floor(Math.random() * 5)
    })
    const matrix = getMatrix(startPos)
    const rewards = getRewards(matrix)
    return {
        startPos,
        table: table(),
        matrix,
        rewards
    }
}

export const debug = async (startPos: number[]) => {
    const matrix = getMatrix(startPos)
    const rewards = getRewards(matrix)
    return {
        startPos,
        table: table(),
        matrix,
        rewards
    }
}