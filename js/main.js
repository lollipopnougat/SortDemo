var SortType;
(function (SortType) {
    SortType[SortType["InsertSort"] = 0] = "InsertSort";
    SortType[SortType["ShellSort"] = 1] = "ShellSort";
    SortType[SortType["SelectSort"] = 2] = "SelectSort";
    SortType[SortType["BubbleSort"] = 3] = "BubbleSort";
    SortType[SortType["QuickSort"] = 4] = "QuickSort";
    SortType[SortType["HeapSort"] = 5] = "HeapSort";
    SortType[SortType["MergeSort"] = 6] = "MergeSort";
})(SortType || (SortType = {}));
var ViewControl = (function () {
    function ViewControl(sortType) {
        this.numsList = new Array();
        this.divList = new Array();
        this.sortType = sortType;
        this.titleList = new Array();
    }
    ViewControl.getController = function (sortType) {
        if (this.viewControl == null) {
            this.viewControl = new ViewControl(sortType);
        }
        else {
            this.viewControl.numsList = new Array();
            this.viewControl.divList = new Array();
            this.viewControl.sortType = sortType;
            this.viewControl.titleList = new Array();
        }
        return this.viewControl;
    };
    ViewControl.prototype.prepareData = function () {
        var _this = this;
        ViewControl.divIdName.forEach(function (element) {
            _this.divList.push($('#' + element));
            $('#i-' + element.substr(0, 2)).attr('disabled', 'true');
        });
        $('#inS').css('display', 'none');
        $('#seS').css('display', 'none');
        $('#buS').css('display', 'none');
        $('#shS').css('display', 'none');
        $('#quS').css('display', 'none');
        this.divList.forEach(function (element) {
            if (isNaN(parseInt(element.text()))) {
                throw new TypeError('非法类型!');
            }
            _this.numsList.push(parseInt(element.text()));
        });
    };
    ViewControl.prototype.getNumsList = function () {
        return this.numsList;
    };
    ViewControl.prototype.swapDiv = function (lhs, rhs) {
        this.divList[lhs].animate({ top: '100px' }, { queue: true, duration: 600 })
            .animate({ left: ViewControl.divWidthCoord[rhs] }, { queue: true, duration: 600 })
            .animate({ top: '0px' }, { queue: true, duration: 600 });
        this.divList[rhs].animate({ top: '50px' }, { queue: true, duration: 600 })
            .animate({ left: ViewControl.divWidthCoord[lhs] }, { queue: true, duration: 600 })
            .animate({ top: '0px' }, { queue: true, duration: 600 });
        var tt = this.divList[lhs];
        this.divList[lhs] = this.divList[rhs];
        this.divList[rhs] = tt;
    };
    ViewControl.prototype.moveDiv = function (lhs, rhs) {
        this.divList[lhs].animate({ top: '100px' }, { queue: true, duration: 600 })
            .animate({ left: ViewControl.divWidthCoord[rhs] }, { queue: true, duration: 600 })
            .animate({ top: '0px' }, { queue: true, duration: 600 });
        this.divList[rhs].animate({ top: '50px' }, { queue: true, duration: 600 });
        var tt = this.divList[lhs];
        this.divList[lhs] = this.divList[rhs];
        this.divList[rhs] = tt;
    };
    ViewControl.prototype.downDiv = function (div, target) {
        this.divList[div].animate({ left: ViewControl.divWidthCoord[target] }, { queue: true, duration: 600 })
            .animate({ top: '0px' }, { queue: true, duration: 600 });
    };
    ViewControl.prototype.movePointer = function (currentNum, leftPoint, rightPoint, isFine) {
        if (isFine) {
            $('#pointl').css('color', '#fff');
            $('#pointr').css('color', '#fff');
            $('#point').css('color', '#48ad59');
        }
        else {
            $('#point').animate({ left: ViewControl.pointerCoord[currentNum].toString() + 'vw' });
            $('#pointl').animate({ left: ViewControl.pointerWidth[leftPoint].toString() + 'vw' });
            $('#pointr').animate({ left: (ViewControl.pointerWidth[rightPoint] - 2).toString() + 'vw' });
        }
    };
    ViewControl.divIdName = ['one', 'two', 'three', 'four', 'five', 'six', 'seven'];
    ViewControl.divWidthCoord = ['9vw', '18vw', '27vw', '36vw', '45vw', '54vw', '63vw'];
    ViewControl.pointerCoord = [8, 17, 26, 35, 44, 53, 62];
    ViewControl.pointerWidth = [12.25, 21.25, 30.25, 39.25, 48.25, 57.25, 66.25, 75.25];
    return ViewControl;
}());
var InertSort = (function () {
    function InertSort() {
        this.isSorted = false;
        this.isFirstRun = true;
        this.viewController = ViewControl.getController(SortType.InsertSort);
        this.currentNum = 1;
        this.lastNum = 0;
    }
    InertSort.prototype.sort = function () {
        if (this.isFirstRun) {
            this.viewController.prepareData();
            this.numsList = this.viewController.getNumsList();
            this.isFirstRun = false;
        }
        if (this.currentNum < this.numsList.length) {
            if (this.lastNum >= 0) {
                if (this.numsList[this.lastNum] > this.numsList[this.lastNum + 1]) {
                    this.swap(this.lastNum, this.lastNum + 1);
                    this.viewController.swapDiv(this.lastNum, this.lastNum + 1);
                    this.lastNum--;
                }
                else {
                    this.currentNum++;
                    this.lastNum = this.currentNum - 1;
                }
            }
            else {
                this.currentNum++;
                this.lastNum = this.currentNum - 1;
            }
            if (this.lastNum < 0) {
                this.viewController.movePointer(this.currentNum, this.lastNum + 1, this.lastNum + 1, (this.currentNum >= this.numsList.length));
            }
            else {
                this.viewController.movePointer(this.currentNum, this.lastNum, this.lastNum + 1, (this.currentNum >= this.numsList.length));
            }
        }
        else {
            this.isSorted = true;
            alert('排序完成');
        }
    };
    InertSort.prototype.getNumsList = function () {
        return this.numsList;
    };
    InertSort.prototype.isFinished = function () {
        return this.isSorted;
    };
    InertSort.prototype.getCurrentNum = function () {
        return this.currentNum;
    };
    InertSort.prototype.getLastNum = function () {
        return this.lastNum;
    };
    InertSort.prototype.swap = function (lhs, rhs) {
        var tmp = this.numsList[lhs];
        this.numsList[lhs] = this.numsList[rhs];
        this.numsList[rhs] = tmp;
    };
    return InertSort;
}());
var ShellSort = (function () {
    function ShellSort() {
        this.isSorted = false;
        this.isFirstRun = true;
        this.controlFlag1 = true;
        this.viewController = ViewControl.getController(SortType.ShellSort);
        this.currentNum = 1;
        this.lastNum = 0;
    }
    ShellSort.prototype.sort = function () {
        if (this.isFirstRun) {
            this.viewController.prepareData();
            this.numsList = this.viewController.getNumsList();
            this.gap = Math.floor(this.numsList.length / 2);
            this.currentNum = this.gap;
            this.isFirstRun = false;
        }
        if (this.gap >= 1) {
            if (this.currentNum < this.numsList.length) {
                if (this.controlFlag1) {
                    this.tmp = this.numsList[this.currentNum];
                    this.lastNum = this.currentNum - this.gap;
                    this.viewController.movePointer(this.gap, this.currentNum, this.lastNum, (this.gap < 1));
                    this.controlFlag1 = false;
                }
                else {
                    this.viewController.movePointer(this.gap, this.currentNum, this.lastNum, (this.gap < 1));
                }
                if (this.lastNum >= 0 && this.numsList[this.lastNum] > this.tmp) {
                    this.swap(this.lastNum + this.gap, this.lastNum);
                    this.viewController.swapDiv(this.lastNum + this.gap, this.lastNum);
                    this.lastNum = this.lastNum - this.gap;
                }
                else {
                    this.currentNum++;
                    this.lastNum = this.currentNum - this.gap;
                    this.viewController.movePointer(this.gap, this.currentNum, this.lastNum, (this.gap < 1));
                    this.controlFlag1 = true;
                }
            }
            else {
                this.gap = Math.floor(this.gap / 2);
                this.currentNum = this.gap;
                this.viewController.movePointer(this.gap, this.currentNum, this.lastNum, (this.gap < 1));
            }
        }
        else {
            this.isSorted = true;
            alert('排序完成');
        }
    };
    ShellSort.prototype.getNumsList = function () {
        return this.numsList;
    };
    ShellSort.prototype.isFinished = function () {
        return this.isSorted;
    };
    ShellSort.prototype.getCurrentNum = function () {
        return this.currentNum;
    };
    ShellSort.prototype.getLastNum = function () {
        return this.lastNum;
    };
    ShellSort.prototype.swap = function (lhs, rhs) {
        var tmp = this.numsList[lhs];
        this.numsList[lhs] = this.numsList[rhs];
        this.numsList[rhs] = tmp;
    };
    return ShellSort;
}());
var SelectSort = (function () {
    function SelectSort() {
        this.isSorted = false;
        this.isFirstRun = true;
        this.viewController = ViewControl.getController(SortType.SelectSort);
        this.currentNum = 1;
        this.maxNums = 0;
        this.currentMaxIndex = 0;
    }
    SelectSort.prototype.sort = function () {
        if (this.isFirstRun) {
            this.viewController.prepareData();
            this.numsList = this.viewController.getNumsList();
            this.isFirstRun = false;
        }
        if (this.currentNum < this.numsList.length - this.maxNums) {
            if (this.numsList[this.currentNum] > this.numsList[this.currentMaxIndex]) {
                this.currentMaxIndex = this.currentNum;
            }
            if (this.currentNum == this.numsList.length - this.maxNums - 1) {
                this.swap(this.numsList.length - this.maxNums - 1, this.currentMaxIndex);
                this.viewController.swapDiv(this.numsList.length - this.maxNums - 1, this.currentMaxIndex);
                this.currentNum = 1;
                this.currentMaxIndex = 0;
                this.maxNums++;
            }
            else {
                this.currentNum++;
            }
            this.viewController.movePointer(this.numsList.length - this.maxNums - 1, this.currentNum, this.currentMaxIndex, (this.maxNums == this.numsList.length - 1));
        }
        else {
            this.isSorted = true;
            alert('排序完成');
        }
    };
    SelectSort.prototype.getNumsList = function () {
        return this.numsList;
    };
    SelectSort.prototype.isFinished = function () {
        return this.isSorted;
    };
    SelectSort.prototype.getCurrentNum = function () {
        return this.currentNum;
    };
    SelectSort.prototype.getmaxNums = function () {
        return this.maxNums;
    };
    SelectSort.prototype.swap = function (lhs, rhs) {
        var tmp = this.numsList[lhs];
        this.numsList[lhs] = this.numsList[rhs];
        this.numsList[rhs] = tmp;
    };
    return SelectSort;
}());
var BubbleSort = (function () {
    function BubbleSort() {
        this.isSorted = false;
        this.isFirstRun = true;
        this.viewController = ViewControl.getController(SortType.BubbleSort);
        this.currentNum = 1;
        this.recNums = 0;
    }
    BubbleSort.prototype.sort = function () {
        if (this.isFirstRun) {
            this.viewController.prepareData();
            this.numsList = this.viewController.getNumsList();
            this.isFirstRun = false;
        }
        if (this.currentNum < this.numsList.length - this.recNums) {
            if (this.numsList[this.currentNum - 1] > this.numsList[this.currentNum]) {
                this.swap(this.currentNum, this.currentNum - 1);
                this.viewController.swapDiv(this.currentNum, this.currentNum - 1);
            }
            if (this.currentNum == this.numsList.length - this.recNums - 1) {
                this.recNums++;
                this.currentNum = 1;
            }
            else {
                this.currentNum++;
            }
            this.viewController.movePointer(this.numsList.length - this.recNums - 1, this.currentNum, this.currentNum - 1, (this.recNums == this.numsList.length - 1));
        }
        else {
            this.isSorted = true;
            alert('排序完成');
        }
    };
    BubbleSort.prototype.getNumsList = function () {
        return this.numsList;
    };
    BubbleSort.prototype.isFinished = function () {
        return this.isSorted;
    };
    BubbleSort.prototype.getCurrentNum = function () {
        return this.currentNum;
    };
    BubbleSort.prototype.getrecNums = function () {
        return this.recNums;
    };
    BubbleSort.prototype.swap = function (lhs, rhs) {
        var tmp = this.numsList[lhs];
        this.numsList[lhs] = this.numsList[rhs];
        this.numsList[rhs] = tmp;
    };
    return BubbleSort;
}());
var QuickSort = (function () {
    function QuickSort() {
        this.isSorted = false;
        this.isFirstRun = true;
        this.flag = 0;
        this.controlFlag = true;
        this.reFlag = true;
        this.highFlag = true;
        this.lowFlag = true;
        this.stack = new Array();
        this.viewController = ViewControl.getController(SortType.BubbleSort);
    }
    QuickSort.prototype.sort = function () {
        if (this.isFirstRun) {
            this.viewController.prepareData();
            this.numsList = this.viewController.getNumsList();
            this.isFirstRun = false;
            this.stack.push(0);
            this.stack.push(this.numsList.length - 1);
        }
        if (this.reFlag) {
            if (this.stack.length == 0) {
                this.viewController.movePointer(this.currentBase, this.left, this.right, true);
                this.isSorted = true;
                alert('排序完成!');
                return;
            }
            this.right = this.stack.pop();
            this.tHigh = this.right;
            this.left = this.stack.pop();
            this.tLow = this.left;
            this.reFlag = false;
        }
        if (this.left <= this.right) {
            if (this.controlFlag) {
                this.tmp = this.numsList[this.left];
                this.currentBase = this.left;
                this.viewController.movePointer(this.currentBase, this.left, this.right, false);
                this.controlFlag = false;
            }
            if (this.highFlag && this.left < this.right) {
                if (this.numsList[this.right] >= this.tmp) {
                    this.right--;
                    this.flag--;
                    this.viewController.movePointer(this.currentBase, this.left, this.right, false);
                }
                else {
                    this.numsList[this.left] = this.numsList[this.right];
                    this.viewController.swapDiv(this.right, this.left);
                    this.highFlag = false;
                    this.lowFlag = true;
                }
            }
            else if (this.lowFlag && this.left < this.right) {
                if (this.numsList[this.left] <= this.tmp) {
                    this.left++;
                    this.flag++;
                    this.viewController.movePointer(this.currentBase, this.left, this.right, false);
                }
                else {
                    this.numsList[this.right] = this.numsList[this.left];
                    this.viewController.swapDiv(this.left, this.right);
                    this.lowFlag = false;
                    this.highFlag = true;
                }
            }
            else {
                this.right--;
            }
        }
        else {
            this.numsList[this.left] = this.tmp;
            if (this.tHigh == this.left && this.flag > 0)
                this.viewController.swapDiv(this.left, this.currentBase);
            this.controlFlag = true;
            if (this.left + 1 < this.tHigh) {
                this.stack.push(this.left + 1);
                this.stack.push(this.tHigh);
            }
            if (this.tLow < this.left - 1) {
                this.stack.push(this.tLow);
                this.stack.push(this.left - 1);
            }
            this.reFlag = true;
        }
    };
    QuickSort.prototype.isFinished = function () {
        return this.isSorted;
    };
    QuickSort.prototype.getNumsList = function () {
        return this.numsList;
    };
    return QuickSort;
}());
function inpuo(inputnum, target) {
    var inp = $('#' + inputnum);
    if (inp.val() == '' || !inp.val())
        $('#' + target).text('0');
    else {
        $('#' + target).text(inp.val());
        var tmp = parseInt(inp.val());
        $('#' + target).css('height', tmp.toString() + 'px');
    }
}
var sorter = new InertSort();
function radioChange() {
    if ($('#inS').prop('checked')) {
        sorter = new InertSort();
        $('#desc1').text('蓝色箭头代表此轮要插入有序列表的数');
        $('#pointr').css('left', '19vw');
        $('#pointl').css('left', '12.25vw');
        $('#point').css('left', '17vw');
    }
    else if ($('#seS').prop('checked')) {
        sorter = new SelectSort();
        $('#desc1').text('蓝色箭头代表当前找到的最大数');
        $('#pointr').css('left', '10.25vw');
        $('#pointl').css('left', '21.25vw');
        $('#point').css('left', '62vw');
    }
    else if ($('#buS').prop('checked')) {
        sorter = new BubbleSort();
        $('#desc1').text('箭头指向当前比较数');
        $('#pointr').css('left', '10.25vw');
        $('#pointl').css('left', '21.25vw');
        $('#point').css('left', '62vw');
    }
    else if ($('#shS').prop('checked')) {
        sorter = new ShellSort();
        $('#desc1').text('红色方块位置索引值表示gap的大小');
        $('#pointr').css('left', '10.25vw');
        $('#pointl').css('left', '21.25vw');
        $('#point').css('left', '35vw');
    }
    else if ($('#quS').prop('checked')) {
        sorter = new QuickSort();
        $('#desc1').text('红色方块表示基准值');
        $('#pointr').css('left', '64.25vw');
        $('#pointl').css('left', '12.25vw');
        $('#point').css('left', '8vw');
    }
}
function sort() {
    sorter.sort();
}
//# sourceMappingURL=main.js.map