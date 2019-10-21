var ViewControl = (function () {
    function ViewControl() {
        this.divIdName = ['one', 'two', 'three', 'four', 'five', 'six', 'seven'];
        this.divWidthCoord = ['9vw', '18vw', '27vw', '36vw', '45vw', '54vw', '63vw'];
        this.pointerCoord = [12, 21, 30, 39, 48, 57, 66];
        this.numsList = new Array();
        this.divList = new Array();
    }
    ViewControl.prototype.prepareData = function () {
        var _this = this;
        this.divIdName.forEach(function (element) {
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
            .animate({ left: this.divWidthCoord[rhs] }, { queue: true, duration: 600 })
            .animate({ top: '0px' }, { queue: true, duration: 600 });
        this.divList[rhs].animate({ top: '50px' }, { queue: true, duration: 600 })
            .animate({ left: this.divWidthCoord[lhs] }, { queue: true, duration: 600 })
            .animate({ top: '0px' }, { queue: true, duration: 600 });
        var tt = this.divList[lhs];
        this.divList[lhs] = this.divList[rhs];
        this.divList[rhs] = tt;
    };
    ViewControl.prototype.movePointer = function (currentNum, lastNum) {
        if (currentNum >= this.numsList.length) {
            $('#pointl').css('display', 'none');
            $('#pointr').css('display', 'none');
            $('#point').css('color', '#48ad59');
        }
        else {
            $('#point').animate({ left: this.pointerCoord[currentNum].toString() + 'vw' });
            $('#pointl').animate({ left: (this.pointerCoord[lastNum] - 2.5).toString() + 'vw' });
            $('#pointr').animate({ left: (this.pointerCoord[lastNum + 1] - 4.5).toString() + 'vw' });
        }
    };
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
            this.viewController.movePointer(this.currentNum, this.lastNum);
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
function sort() {
    sorter.sort();
}
//# sourceMappingURL=main.js.map