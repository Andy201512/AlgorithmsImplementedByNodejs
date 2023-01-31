function findMaxValue(arr) {
    let max = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (max < arr[i]) {
            max = arr[i];
        }
    }
    return max;
}

function CountingSort(arr) {
    /**
     * 找到数组中的最大值，
     * 创建相应长度的计数数组（js 是动态的，这一步不要也行）
     */
    let maxValue = findMaxValue(arr);
    let counts = new Array(maxValue + 1); // 创建计数数组

    // 生成计数数组
    for (let i = 0; i < arr.length; i++) {
        let index = arr[i]; // 原数组的值当作计数数组的下标
        if (!counts[index]) {
            counts[index] = 0; // 如果计数值不存在，则先初始化为 0
        }
        // 计数
        counts[index]++;
    }

    // 从计数数组还原出排好序的数组。
    let sortedIndex = 0;
    for (let i = 0; i < counts.length; i++) {
        while (counts[i] > 0) {
            arr[sortedIndex++] = i;
            counts[i]--;
        }
    }
    return arr;
}

module.exports = CountingSort