var ViewControl = (function () {
    function ViewControl() {
        this.numsList = new Array();
        this.divList = new Array();
    }
    ViewControl.prototype.prepareData = function () {
        var _this = this;
        ViewControl.divIdName.forEach(function (element) {
            _this.divList.push($('#' + element));
            $('#i-' + element.substr(0, 2)).attr('disabled', 'true');
        });
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
    ViewControl.pointerWidth = [12.25, 21.25, 30.25, 39.25, 48.25, 57.25, 66.25];
    return ViewControl;
}());
var InertSort = (function () {
    function InertSort() {
        this.isSorted = false;
        this.isFirstRun = true;
        this.viewController = new ViewControl();
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
            this.viewController.movePointer(this.currentNum, this.lastNum, this.lastNum + 1, (this.currentNum >= this.numsList.length));
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
var SelectSort = (function () {
    function SelectSort() {
        this.isSorted = false;
        this.isFirstRun = true;
        this.viewController = new ViewControl();
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
}
function sort() {
    sorter.sort();
}
//# sourceMappingURL=main.js.map