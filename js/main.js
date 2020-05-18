var ViewControl = (function () {
    function ViewControl() {
        var _this = this;
        this.pointList = [];
        this.pointLocationX = [0, 1, 1];
        this.numList = [49, 96, 32, 128, 57, 64, 22];
        this.selectedType = 'InsertSort';
        this.getSorter = function () {
            var sort;
            switch (_this.selectedType) {
                case 'InsertSort':
                    sort = new InsertSort(_this.numList, _this);
                    break;
                case 'SelectSort':
                    sort = new SelectSort(_this.numList, _this);
                    break;
                case 'BubbleSort':
                    sort = new BubbleSort(_this.numList, _this);
                    break;
                default: throw new Error("啊咧，这个还未实现的");
            }
            return sort;
        };
        this.updateValues = function () {
            $('#val-area').children().remove();
            _this.rectList.length = 0;
            var val_str = $('#input-box').val();
            _this.numList.length = 0;
            val_str.split(',').forEach(function (el) {
                _this.numList.push(parseInt(el));
            });
            _this.rectList = ViewControl.buildDivElement(_this.numList);
            _this.rectList.forEach(function (el) {
                $('#val-area').append(el);
            });
        };
        this.delayItem = function (index, delayTime) {
            _this.rectList[index].animate({ left: index * 9 + 9 + "vw" }, { duration: delayTime, queue: true });
        };
        this.delayAllItem = function (delayTime) {
            _this.rectList.forEach(function (el, index) {
                el.animate({ left: index * 9 + 9 + "vw" }, { duration: delayTime, queue: true });
            });
        };
        this.delayPointer = function (index, delayTime) {
            var offset = 12;
            if (index == 1)
                offset = 10;
            if (index == 2)
                offset = 8;
            _this.pointList[index].animate({ left: _this.pointLocationX[index] * 9 + offset + "vw" }, { duration: delayTime, queue: true });
        };
        this.swapItem = function (l, r) {
            _this.rectList[l].animate({ left: r * 9 + 9 + "vw" }, { duration: 500, queue: true });
            _this.rectList[r].animate({ left: l * 9 + 9 + "vw" }, { duration: 500, queue: true });
            for (var i = 0; i < _this.rectList.length; i++) {
                if (i == l || i == r) {
                    continue;
                }
                _this.delayItem(i, 500);
            }
            var tmp = _this.rectList[l];
            _this.rectList[l] = _this.rectList[r];
            _this.rectList[r] = tmp;
        };
        this.movePointer = function (index, toIndex, delayTime) {
            _this.pointLocationX[index] = toIndex;
            var offset = 12;
            if (index == 1)
                offset = 10;
            if (index == 2)
                offset = 8;
            _this.pointList[index].animate({ left: toIndex * 9 + offset + "vw" }, { duration: delayTime, queue: true });
        };
        this.rectList = ViewControl.buildDivElement(this.numList);
        this.rectList.forEach(function (el) {
            $('#val-area').append(el);
        });
        $('#submit-btn').on('click', function () {
            _this.updateValues();
        });
        this.pointList.push($('#point-l'));
        this.pointList.push($('#point-r'));
        this.pointList.push($('#point'));
        $('#start').on('click', function () {
            var radiolist = $('input[name="select-type"]');
            for (var i = 0; i < radiolist.length; i++) {
                var tmp = radiolist[i];
                if (tmp.checked) {
                    _this.selectedType = tmp.value;
                    break;
                }
            }
            console.log(_this.selectedType);
            try {
                var sort = _this.getSorter();
                sort.sort();
            }
            catch (er) {
                alert(er.toString());
            }
        });
    }
    ViewControl.getViewControl = function () {
        if (!ViewControl.inViewControl) {
            ViewControl.inViewControl = new ViewControl();
        }
        return ViewControl.inViewControl;
    };
    ViewControl.buildDivElement = function (list) {
        var tmp = [];
        if (list.length > 7 || list.length < 1) {
            throw new Error('数组长度非法');
        }
        var num = 0;
        list.forEach(function (el) {
            tmp.push($("<div class=\"blockbox rect" + num + "\" id=\"rect" + num + "\">" + el + "</div>"));
            num++;
        });
        return tmp;
    };
    return ViewControl;
}());
var InsertSort = (function () {
    function InsertSort(nums, vc) {
        var _this = this;
        this.numList = [];
        this.finished = false;
        this.swap = function (l, r) {
            var tmp = _this.numList[l];
            _this.numList[l] = _this.numList[r];
            _this.numList[r] = tmp;
            _this.viewControl.swapItem(l, r);
        };
        this.sort = function () {
            for (var i = 1; i < _this.numList.length; i++) {
                var j = i;
                while (j >= 1 && _this.numList[j - 1] > _this.numList[j]) {
                    _this.swap(j, j - 1);
                    _this.viewControl.movePointer(1, j - 1, 500);
                    _this.viewControl.delayPointer(2, 500);
                    j--;
                    _this.viewControl.movePointer(0, j - 1, 500);
                }
                _this.viewControl.movePointer(2, i + 1, 500);
                _this.viewControl.delayPointer(1, 500);
                _this.viewControl.delayPointer(0, 500);
                _this.viewControl.delayAllItem(500);
            }
            _this.finished = true;
        };
        this.isFinished = function () {
            return _this.finished;
        };
        this.numList = nums;
        this.viewControl = vc;
    }
    return InsertSort;
}());
var BubbleSort = (function () {
    function BubbleSort(nums, vc) {
        var _this = this;
        this.numList = [];
        this.finished = false;
        this.swap = function (l, r) {
            var tmp = _this.numList[l];
            _this.numList[l] = _this.numList[r];
            _this.numList[r] = tmp;
            _this.viewControl.swapItem(l, r);
        };
        this.sort = function () {
            for (var i = 0; i < _this.numList.length - 1; i++) {
                for (var j = 0; j < _this.numList.length - i - 1; j++) {
                    _this.viewControl.movePointer(0, j, 500);
                    _this.viewControl.movePointer(1, j + 1, 500);
                    _this.viewControl.delayPointer(2, 500);
                    _this.viewControl.delayAllItem(500);
                    if (_this.numList[j] > _this.numList[j + 1]) {
                        _this.swap(j, j + 1);
                        _this.viewControl.movePointer(2, _this.numList.length - i - 1, 500);
                        _this.viewControl.delayPointer(0, 500);
                        _this.viewControl.delayPointer(1, 500);
                    }
                }
            }
            _this.viewControl.movePointer(2, 0, 500);
            _this.finished = true;
        };
        this.isFinished = function () {
            return _this.finished;
        };
        this.numList = nums;
        this.viewControl = vc;
    }
    return BubbleSort;
}());
var SelectSort = (function () {
    function SelectSort(nums, vc) {
        var _this = this;
        this.numList = [];
        this.finished = false;
        this.swap = function (l, r) {
            var tmp = _this.numList[l];
            _this.numList[l] = _this.numList[r];
            _this.numList[r] = tmp;
            _this.viewControl.swapItem(l, r);
        };
        this.sort = function () {
            var max_index = 0;
            _this.viewControl.movePointer(2, _this.numList.length - 1, 500);
            _this.viewControl.delayPointer(0, 500);
            _this.viewControl.movePointer(1, 0, 500);
            _this.viewControl.delayAllItem(500);
            for (var i = 0; i < _this.numList.length - 1; i++) {
                var j = 0;
                for (j = 0; j < _this.numList.length - i; j++) {
                    _this.viewControl.movePointer(1, j, 500);
                    _this.viewControl.delayPointer(0, 500);
                    _this.viewControl.delayPointer(2, 500);
                    _this.viewControl.delayAllItem(500);
                    if (_this.numList[j] > _this.numList[max_index]) {
                        max_index = j;
                        _this.viewControl.movePointer(0, max_index, 500);
                        _this.viewControl.delayPointer(1, 500);
                        _this.viewControl.delayPointer(2, 500);
                        _this.viewControl.delayAllItem(500);
                    }
                }
                _this.swap(_this.numList.length - i - 1, max_index);
                _this.viewControl.movePointer(0, 0, 500);
                _this.viewControl.movePointer(1, 0, 500);
                _this.viewControl.movePointer(2, _this.numList.length - i - 1, 500);
                max_index = 0;
            }
            _this.viewControl.movePointer(0, 0, 500);
            _this.viewControl.movePointer(1, 0, 500);
            _this.viewControl.movePointer(2, 0, 500);
            _this.finished = true;
        };
        this.isFinished = function () {
            return _this.finished;
        };
        this.numList = nums;
        this.viewControl = vc;
    }
    return SelectSort;
}());
window.onload = function () {
    var viewControl = ViewControl.getViewControl();
};
//# sourceMappingURL=main.js.map